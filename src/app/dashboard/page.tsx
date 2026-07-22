import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";


export default async function Dashboard() {

  const session = await getServerSession(authOptions);


  if (!session) {
    redirect("/login");
  }


  const loginDate = new Date().toLocaleString("fr-FR");


  return (
    <div>
      
      <Header user={session.user} />

      <h1>
        Tableau de bord WarehouseOS
      </h1>


      {session.user ? (
        <div>

          <h2>
            Bienvenue {session.user.name} 👋
          </h2>


          <div>

            <h3>
              Informations utilisateur
            </h3>


            <p>
              Nom : {session.user.name}
            </p>


            <p>
              Email : {session.user.email}
            </p>

          </div>


        </div>

      ) : (

        <p>
          Aucun utilisateur connecté
        </p>

      )}


      <div>

        <h3>
          Date de connexion
        </h3>


        <p>
          {loginDate}
        </p>

      </div>


      
      
      <Footer/>

    </div>
  );
}