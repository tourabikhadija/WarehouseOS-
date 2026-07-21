import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { registerSchema } from "@/schemas/user.schema";
import { createUser, findUserByEmail } from "@/services/user.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Extraire les données validées
    const { name, email, password } = result.data;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { message: "Cet email est déjà utilisé." },
        { status: 409 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    await createUser({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "Utilisateur créé avec succès" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur serveur" },
      { status: 500 }
    );
  }
}