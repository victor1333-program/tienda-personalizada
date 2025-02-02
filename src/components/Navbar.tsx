import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold">Tienda Personalizada</h1>
        </Link>
        <div>
          <Link href="/catalog" className="mr-4">Catálogo</Link>
          <Link href="/editor" className="mr-4">Editor</Link>
          <Link href="/cart">Carrito</Link>
        </div>
      </div>
    </nav>
  );
}
