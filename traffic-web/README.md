# web

### Setup Development Environment
Dev Containers allows us to have a consistent development environment and easily contribute to the repo. 

1. Download **vscode**
2. Install **Dev Containers** extension
3. Clone the repo
4. Open with **vscode**
5. There should be a popup that says **Reopen in Container**, otherwise open the Command Palette and click **Reopen in Container**
![open in devcontainer](/readme/devcontainer.png)


### Run application

1. change directory to the app folder
```bash
cd app
```
2. setup environment variables
   1. create .env file
   2. save vars in file
```
REACT_APP_API_URL=**url**
```
3. run command below to load env
```bash
export $(cat .env)
```
4. run command below to start app
```bash
npm start
```

### CI/CD
For now we will use the main branch


### notes
* Forward ssh keys to dev container follow this guideline:
[vscode ssh](https://code.visualstudio.com/remote/advancedcontainers/sharing-git-credentials#_using-a-credential-helper)
