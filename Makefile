.PHONY: init_ia_sandbox init_environment

ENV_NAME=MDS_env

init:
	$(MAKE) init_ia_sandbox
	$(MAKE) init_environment

init_ia_sandbox:
	@sudo ./Engine/Engine/init_ia_sandbox.sh

init_environment:
	conda env update --name $(ENV_NAME) --file $(ENV_NAME).yml
