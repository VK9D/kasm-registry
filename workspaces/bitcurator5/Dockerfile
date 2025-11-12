# Modified version of Bitcurator's Dockerfile designed to work with Kasm.
# Bitcurator dockerfile: "https://github.com/BitCurator/bitcurator-docker/blob/main/Dockerfile.noble"
# For a working Docker image see "https://hub.docker.com/repository/docker/squirrelworksllc/bitcurator5"

##################### SOF ###################
FROM kasmweb/core-ubuntu-noble:1.18.0-rolling-weekly
USER root
ENV HOME=/home/kasm-default-profile
ENV STARTUPDIR=/dockerstartup
ENV INST_SCRIPTS=$STARTUPDIR/install
WORKDIR $HOME

######### START Bitcurator Container Customizations ###########
# Step 1 - Download and prep Bitcurator CLI
RUN apt update && apt upgrade -y
RUN apt install nano build-essential gcc make perl wget curl gnupg -y
RUN wget https://github.com/BitCurator/bitcurator-cli/releases/download/v2.0.0/bitcurator-cli-linux && \
mv bitcurator-cli-linux /usr/local/bin/bitcurator
RUN chmod +x /usr/local/bin/bitcurator
# Step 2 - Add kasm-user to the proper groups
RUN groupadd bcadmin && \
usermod -aG sudo,bcadmin kasm-user
# Step 3 - Install Bitcurator (will take some time)
RUN sudo /usr/local/bin/bitcurator install --user=kasm-user
######### END Bitcurator Container Customizations ###########

RUN chown 1000:0 $HOME
RUN $STARTUPDIR/set_user_permission.sh $HOME
ENV HOME=/home/kasm-user
WORKDIR $HOME
RUN mkdir -p $HOME && chown -R 1000:0 $HOME
USER 1000
##################### EOF ###################