.PHONY: init_ia_sandbox init_environment deploy

CONDA_ENV=MDS_env

deploy:
	./deploy_script.sh

init:
	$(MAKE) init_ia_sandbox
	$(MAKE) init_environment

init_ia_sandbox:
	@sudo ./Engine/Engine/init_ia_sandbox.sh

init_environment:
	conda env update --name $(CONDA_ENV) --file $(CONDA_ENV).yml
