$(document).ready(function () {

    ruta = window.location.origin;

    //$('#btnIngresar').click(function () {
    //    ValidaUsuario();
    //});

});

let ruta = '';

function ValidaUsuario() {
    let usu = '';
    let pass = '';

    usu = $("#txtUsuario").val();
    pass = $("#txtPassword").val();

    var response = grecaptcha.getResponse();
    if (response.length == 0) {
        $("#error").html("Marcar el Captcha");
        $('#ModalAlert').modal("show");
        setTimeout(function () {
            $('#btnOK').focus();
        }, 500);
        
    }
    return;

    var Datos = {};
    Datos.no_usuario = usu;
    Datos.ps_usuario = pass;

    var DTO = {};
    DTO.Datos = Datos;

    var table = null;
    $.ajax({
        method: 'POST',
        url: ruta + '/Login/ValidaUsuario',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(DTO),
        dataType: "json",
        success: function (data) {
            
            if(data == 1)
            {
                //var returnUrl = '@Request.QueryString["ReturnUrl"]';
                //alert('1');
                //if (returnUrl == "") {
                window.location.href = 'Inicio/Index';
                //}
                //else {
                //    window.location.href = returnUrl;
                //}
            }
            else {
           
                $("#error").html("Usuario y/o password incorrectos");
                $('#ModalAlert').modal("show");
                setTimeout(function () {
                    $('#btnOK').focus();
                }, 500);
            }

        },
        error: function (e) {
            console.log('Error')
            console.log(data);
        }
    });    
}

