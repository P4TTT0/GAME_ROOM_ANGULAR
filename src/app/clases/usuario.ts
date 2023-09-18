export class Usuario 
{
    name : string;
    password : string;
    mail : string; 

    constructor(name : string, password : string, mail : string)
    {
        this.name = name;
        this.password = password;
        this.mail = mail;
    }

    setLocalStorage() 
    {
        let userList : Array<Usuario>;

        userList = Usuario.getLocalStorage();

        userList.push(this);

        localStorage.setItem("users", JSON.stringify(userList));
    }

    public static getLocalStorage() : Array<Usuario>
    {
        let json = null;
        let userJSON : string | null = localStorage.getItem("users");

        if(userJSON != null)
        {
            json = JSON.parse(userJSON);
        }
        else
        {
            json = Array<Usuario>();
        }

        return json;
    }
}
