
async function loadDatabase(){
    
    try{
          const SQL = await initSqlJs({ locateFile:() => "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.wasm" });
                    
      // Fetch the database file from GitHub
          let response = await fetch("https://raw.githubusercontent.com/Abdelrhman-Ahmed1/WebProject-DB/main/PASSWORDS.db");
          
          let buffer = await response.arrayBuffer();
          db = new SQL.Database(new Uint8Array(buffer));
          
          // Run SQL query
          console.log("Database Found")
    }catch(e){
        console.log("Error: " + e);
    }
};



