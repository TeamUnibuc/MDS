.PHONY: init_ia_sandbox init_environment

init:
	$(MAKE) init_ia_sandbox
	$(MAKE) init_environment

init_ia_sandbox:
	@sudo ./Engine/Engine/init_ia_sandbox.sh

init_environment:
	conda env update --name MDS_env --file MDS_env.yml