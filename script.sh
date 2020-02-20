#!/bin/bash
#######################################################################~#
# SCRIPT:        deploy.sh
# USAGE:        ./deploy.sh | bash deploy.sh
# PURPOSE:       Shell script that adds uploads the angular project to the production/staging server.
# TITLE:        deploy.sh
# AUTHOR:       Jose Gracia
# VERSION:      1.0.0
# NOTES:        You will have to know the IP of the servers.
# BASH_VERSION: GNU bash, 5.0.0-17-generic #18-Ubuntu SMP Tue Jun 4 15:34:08 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
# LICENSE:      GNU General Public License v3.0
# GITHUB:       https://github.com/Josee9988/
# MAIL:         jgracia9988@gmail.com
#######################################################################~#

bold=$(echo -en "\e[1m")
normal=$(echo -en "\e[0m")
purple=$(echo -en "\e[35m")
blink=$(echo -en "\e[5m")
red=$(echo -en "\e[31m")


echo " _  _        _  _        _     _  __  ___  "
echo "/ \/ \_/|  / \/ \  /|  / \   / \/ _\/_ __\ "
echo "| || |\/||  | || |\ ||  | |   | ||    \  / \   "
echo "| || |  ||  | || | \||  | |/\| |\__ |  | |   "
echo "\_/\_/  \|  \_/\_/  \|  \__/\_/\__/  \_/   "
echo "                                               "


echo "Welcome, we will deploy your ${blink}${purple}ImInList${normal} angular application!"
echo ""

echo ""
echo "(Press enter to deploy)"

read -p "Do you wish to deploy it to ${red}${bold}production${normal}? [Yy/Nn]" yn
case $yn in
[Yy]*) # PRODUCTION
echo "Building the production application."
ng build --prod --optimization --named-chunks --aot --build-optimizer
scp -P 443 -r dist/* front@ec2-54-165-254-46.compute-1.amazonaws.com:/var/www/html/ImInList ;;
[Nn]*) # STAGING
echo "Building the stating application."
ng build --optimization --named-chunks --aot --build-optimizer
scp -P 443 -r dist/* front@ec2-54-243-26-179.compute-1.amazonaws.com:/var/www/html/ImInList 
 ;;
*) echo "Please answer yes or no. We will not deploy nothing for now." ;;
esac
