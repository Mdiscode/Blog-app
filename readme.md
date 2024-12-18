## Make a Blog-App
## setUp Laravel 
```
install larave
composer global require laravel/installer
```
## Creating App
```
laravel new example-app
cd example-app
npm install && npm run build
npm run dev
```

## SetUp React Application
'''
check nodejs and npm
node -v
npm -v
npm create vite@latest project_name

'''
Step 3: select framework like Reack
Step 4 :select Variant javascript
Step 5 : Swithc to react-app folder
 >cd react-app
 Step 6 : install dependencies
 >npm install
 Step 7 :run this command
 >npm run dev

 ## install bootstrap
 ```
 npm install react-bootstrap bootstrap
 ```
 ## install react-router-dom
 ```
npm i react-router-dom
 ```
## install React Simple Wysiwying
```
npm install react-simple-wysiwyg
```

## install React form hook for validate
```
npm install react-hook-form
```
## install React Toastify used for submit the form message
```
npm i react-toastify
```

## upload the image 
step 1 : create the migrate images in laravel

 ```
 >php artisan make:migrate create_images_table
 >php artisan migrate
 >php artisan make:model TempImage
 >php artisan make:controller TempImageController
 ```