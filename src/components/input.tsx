// import React, { InputHTMLAttributes } from 'react';
// import * as Icons from 'lucide-react'; // Importe todos os ícones disponíveis de lucide-react

// interface ButtonProps extends InputHTMLAttributes<HTMLInputElement> {
//   placeholder: string;
//   icon: keyof typeof Icons | string; // Defina a prop icon como uma chave de tipo dos ícones de lucide-react
// }

// export const Button: React.FC<ButtonProps> = ({
//   placeholder,
//   icon,
//   ...props
// }) => {
//   const IconComponent = Icons[icon as keyof typeof Icons]; // Acesse o ícone dinamicamente

//   return (
//     <div className="p-2.5 bg-zinc-950 border-x-zinc-800 rounded-lg flex items-center gap-2">
//       {IconComponent && <IconComponent className="size-5 text-zinc-400" />}{' '}
//       {/* Renderize o ícone dinâmico */}
//       <input
//         {...props}
//         type="text"
//         className="bg-transparent text-lg placeholder-zinc-400 outline-none"
//         placeholder={placeholder}
//         onChange={props.onChange} // Propague a prop onChange para o input
//       />
//     </div>
//   );
// };
