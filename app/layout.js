import './globals.css'; // Assurez-vous que le chemin est correct

export const metadata = {
  title: 'AI NFT Minter',
  description: 'Générez et mintez vos NFT par IA',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
