import app from './app'

//listener
app.listen(app.get("port"),  () => {
    console.log(`Sever on port: ${app.get("port")}`);
});