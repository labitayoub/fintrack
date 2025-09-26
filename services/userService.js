import User from "../models/User";
import bcrypt from "bcryptjs";

export const registerUser = async ({ nom, email, mot_de_passe, devise }) => {

    const findUser = await User.findOne({ where: { email } });
    if (findUser) return { data: "User already exists", statusCode: 400 };

   if (mot_de_passe.length < 6) {
        return { 
    
            data: "Le mot de passe doit contenir au moins 6 caractères", 
            statusCode: 400 
        };
    }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { 
                data: "Format d'email invalide", 
                statusCode: 400 
            };
        }

    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    const user = await User.create({ nom, email, mot_de_passe: hashedPassword, devise });
    
    return { data: user , statusCode: 201 };
};

export const loginUser = async ({ email, mot_de_passe }) => {

    const user = await User.findOne({ where: { email } });

    if (!user) return { data: "User not found", statusCode: 404 };

    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

    if (!isMatch) return { data: "Invalid credentials", statusCode: 401 };

    return { data: user, statusCode: 200 };
};
