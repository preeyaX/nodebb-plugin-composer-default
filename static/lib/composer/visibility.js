'use strict';

define('composer/visibility', ['api', 'alerts'], function (api, alerts) {
	var visibility = {};

	visibility.init = function (postContainer, postData) {
		var visibilityContainer = postContainer.find('[component="composer/visibility"]');
		if (!visibilityContainer.length) {
			return;
		}

		var dropdown = visibilityContainer.find('.dropdown');
		var button = dropdown.find('.dropdown-toggle');
		var menu = dropdown.find('.dropdown-menu');
		var selectedText = button.find('.selected-text');
		var selectedCount = button.find('.selected-count');
		var hiddenInput = visibilityContainer.find('.visibility-input');

		var selectedGroups = []; // Default to empty (will default to 'all' when posting)
		var availableGroups = [];

		// Load available groups
		loadGroups();

		// Handle dropdown item clicks
		menu.on('click', '.form-check-input', function (e) {
			e.stopPropagation();
			updateSelection();
		});

		// Prevent dropdown from closing when clicking inside
		menu.on('click', function (e) {
			e.stopPropagation();
		});

		function loadGroups() {
			api.get('/groups/postable', {})
				.then(function (response) {
					availableGroups = response.groups;
					renderGroupsList();
					updateSelection();
				})
				.catch(function (err) {
					alerts.error('Failed to load groups: ' + (err.message || 'Unknown error'));
					console.error('Error loading postable groups:', err);
				});
		}

		function renderGroupsList() {
			var loadingIndicator = menu.find('.loading-indicator');
			loadingIndicator.remove();

			var groupsHtml = availableGroups.map(function (group) {
				var isChecked = selectedGroups.indexOf(group.name) !== -1;
				var memberText = group.memberCount !== null ?
					group.memberCount + ' members' : 'All users';

				return `
					<li>
						<div class="form-check">
							<input class="form-check-input visibility-option"
								   type="checkbox"
								   value="${group.name}"
								   id="visibility-${group.name}"
								   ${isChecked ? 'checked' : ''}>
							<label class="form-check-label d-flex align-items-center" for="visibility-${group.name}">
								<span class="flex-grow-1">${group.displayName}</span>
								<small class="text-muted ms-2">${memberText}</small>
							</label>
						</div>
					</li>
				`;
			}).join('');

			menu.append(groupsHtml);
		}

		function updateSelection() {
			var checkedOptions = menu.find('.visibility-option:checked');
			selectedGroups = [];

			checkedOptions.each(function () {
				selectedGroups.push($(this).val());
			});

			// If no groups selected, keep empty array (will default to 'all' when posting)

			// Update UI
			updateButtonText();
			hiddenInput.val(JSON.stringify(selectedGroups));
		}

		function updateButtonText() {
			var count = selectedGroups.length;
			selectedCount.text(count);

            if (count === 0) {
                selectedText.text('Everyone (Public)');
            } else if (count === 1) {
				var group = availableGroups.find(function (g) {
					return g.name === selectedGroups[0];
				});
				selectedText.text(group ? group.displayName : 'Unknown');
			} else {
				selectedText.text(count + ' groups selected');
			}
		}

		// Initialize with postData if available
		if (postData && postData.visibleTo) {
			try {
				var visibleTo = Array.isArray(postData.visibleTo) ?
					postData.visibleTo : JSON.parse(postData.visibleTo);
				selectedGroups = visibleTo;
			} catch (e) {
				console.warn('Failed to parse visibleTo data:', postData.visibleTo);
			}
		}
	};

	return visibility;
});