document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('canvas-assinatura');
    const signaturePad = new SignaturePad(canvas);

    document.getElementById('limpar-assinatura').addEventListener('click', () => {
        signaturePad.clear();
    });

    document.getElementById('finalizar-termo').addEventListener('click', function() {
        if (signaturePad.isEmpty()) {
            alert("Por favor, assine o termo antes de continuar.");
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // 1. Monta o PDF
        doc.setFontSize(18);
        doc.text("Termo de Voluntariado - ONG Ágape", 20, 20);
        doc.setFontSize(10);
        doc.text("Eu, voluntário cadastrado, aceito os termos da Lei 9.608/98...", 20, 40);
        
        // 2. Coloca a assinatura no PDF
        const imgData = signaturePad.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 20, 60, 50, 25);
        doc.text("Assinatura Digital", 20, 90);

        // 3. Salva o PDF (Cópia do Usuário)
        doc.save("Termo_Agape_Voluntario.pdf");

        // Opcional: Limpa o canvas após o download para o usuário ver que deu certo
       signaturePad.clear();
       alert("Termo gerado! Agora anexe o arquivo no WhatsApp da Ágape.");

        // 4. Redireciona para o WhatsApp da ONG
        const msg = encodeURIComponent("Olá Ágape! Acabei de assinar o meu termo de voluntariado. Vou anexar o PDF aqui agora!");
        window.location.href = `https://wa.me/5531991611202?text=${msg}`;
    });
});