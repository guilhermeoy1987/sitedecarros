$(document).ready(function () {
    // ===== CARROSSEL =====
    $('#carousel-imagens').slick({
        autoplay: true
    });

    // ===== MENU HAMBURGUER =====
    $('.menu-hamburguer').click(function () {
        $('nav').slideToggle();
    });

    // ===== MÁSCARA DINÂMICA TELEFONE =====
    const spMask = function (val) {
        const n = val.replace(/\D/g, "").length;
        return n === 11 ? "(00) 00000-0000" : "(00) 0000-0000";
    };

    $('#telefone').mask(spMask, {
        onKeyPress: function (val, e, field, options) {
            field.mask(spMask.apply({}, arguments), options);
        }
    });

    // ===== MÉTODO CUSTOM PARA VALIDAÇÃO DO TELEFONE =====
    $.validator.addMethod(
        "telefoneBR",
        function (value, element) {
            const somenteNum = value.replace(/\D/g, "");
            return this.optional(element) || somenteNum.length === 10 || somenteNum.length === 11;
        },
        "Digite um telefone válido"
    );

    // ===== VALIDAÇÃO DO FORMULÁRIO =====
    $('form').validate({
        rules: {
            nome: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            tel: {
                required: true,
                telefoneBR: true
            },
            veiculointeresse: {
                required: true
            },
        },
        messages: {
            nome: {
                required: 'Insira seu nome!',
                minlength: 'Seu nome deve ter pelo menos 2 letras.'
            },
            email: {
                required: 'Digite seu E-Mail',
                email: 'Digite um e-mail válido'
            },
            tel: {
                required: 'Digite seu número de celular',
                telefoneBR: 'Digite um número válido'
            },
            veiculointeresse: 'Qual veículo te interessou?',
        },
        submitHandler: function (form) {
            // Aqui você pode enviar os dados via AJAX, se quiser
            const dados = {
                nome: $('#nome').val().trim(),
                telefone: $('#telefone').val().trim(),
                email: $('#email').val().trim(),
                veiculo: $('#veiculo-interesse').val().trim(),
                mensagem: $('#mensagem').val().trim()
            };

            console.log("Dados do formulário:", dados);

            alert("Recebemos seu contato! Em breve retornaremos.");

            form.reset();
            $('#telefone').trigger('keyup'); // reaplica a máscara
        },
        invalidHandler: function (evento, validador) {
            let camposIncorretos = validador.numberOfInvalids();
            if (camposIncorretos) {
                alert(`Existem ${camposIncorretos} campo(s) para preencher!`);
            }
        }
    });

    // ===== BOTÃO "TENHO INTERESSE" =====
    $('.lista-veiculos button').click(function () {
        const destino = $('#contato');
        const nomeVeiculo = $(this).parent().find('h3').text();

        $('#veiculo-interesse').val(nomeVeiculo);

        $('html, body').animate({
            scrollTop: destino.offset().top
        }, 500);
    });
});
