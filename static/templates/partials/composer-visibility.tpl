<div class="visibility-row mb-3" component="composer/visibility">
	<div class="d-flex align-items-center gap-2">
		<div class="flex-shrink-0">
			<label class="form-label fw-semibold mb-0">
				<i class="fa fa-eye me-1"></i>
				Visibility:
			</label>
		</div>
		<div class="flex-grow-1">
			<div class="dropdown">
				<button class="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center justify-content-between w-100"
						type="button"
						data-bs-toggle="dropdown"
						aria-expanded="false">
					<span class="selected-text">Everyone (Public)</span>
					<span class="badge bg-primary ms-2 selected-count">0</span>
				</button>
				<ul class="dropdown-menu p-2" style="min-width: 300px; max-height: 300px; overflow-y: auto;">
					<li class="dropdown-header small text-muted">Select who can see this post:</li>
					<li class="loading-indicator text-center py-2">
						<i class="fa fa-spinner fa-spin"></i>
						<small class="ms-1">Loading groups...</small>
					</li>
				</ul>
			</div>
			<input type="hidden" name="visibleTo" class="visibility-input" value='[]'>
		</div>
	</div>
</div>