"use client";
import { signOut } from "next-auth/react";

export default function Header({user} : any){
    return(
        <header>
            
          <nav>
           <h2>WarehouseOS</h2>

             <span>
                {user?.name}
             </span>

                 <button onClick={()=> signOut ({callbackUrl : "/login"})}>
                    Déconnexion
                 </button>
          </nav>  
        </header>
    );
}