import React from 'react';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';

export default function LogoutPage() {
  const router = useRouter();

  destroyCookie(null, 'cookieName')

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>VOLTE SEMPRE!</strong> você acabou de fazer logout no sistema</p>
          
        </section>
        <section className="formArea">
          <div className="box">
            <p>
              Para retornar ao Alurakut <strong>clique no botão abaixo!</strong>
            </p>
            <a href="/login" style={{marginTop: 10}}>
              <button>
                Retornar a página de Login
              </button>
            </a>
          </div>
          
        </section>
        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
}