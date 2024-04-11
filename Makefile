run:
	docker compose up

clean:
	docker container ls -aq | xargs --no-run-if-empty docker container rm -f
	docker volume ls -q | xargs --no-run-if-empty docker volume rm -f
	docker image ls -q | xargs --no-run-if-empty docker image rm -f
