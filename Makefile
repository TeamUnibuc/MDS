.PHONY: init_ia_sandbox install_ia_sandbox

# TODO: Check if cargo and ia-sandbox already exist
install_ia_sandbox:
	cargo install ia-sandbox

init_ia_sandbox:
	@./Engine/Engine/init_ia_sandbox.sh