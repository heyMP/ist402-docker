# OpenFaas Serverless Functions

## Install on Play with Docker

Start with no instances.  If any instances exist you should delete them

![](images/1.png)

Click on the "wrench" icon and create a new swarm with with 1 manager and 1 worker node.


![](images/2.png)

Deploy an OpenFaas stack by running the following command on the manager1 terminal.

```bash
git clone https://github.com/openfaas/faas && \
  cd faas && \
  ./deploy_stack.sh
```

![](images/4.png)

Copy the generated admin password in the console. 

![](images/5.png)

Open port `8080`.  You will be presented with a basic authorization dialog.  Enter username: admin and paste the password that you copied from the previous step


![](images/6.png)

You should now see the OpenFaas Dashbord.

![](images/7.png)

Deploy the Figlet function by clicking `Deploy New Function`.  Then select Figlet and the deploy button.

![](images/8.png)

Congratualations!  You've deployed your first serverless function.

![](images/9.png)

Test out your function, copy the url of your new function.

![](images/10.png)

Now use your function, paste the following command in any terminal. Replace `<username>` with your Github username and `<url>` with the url you copied in the previous step.

`curl -d "<username>" <url>`

![](images/11.png)