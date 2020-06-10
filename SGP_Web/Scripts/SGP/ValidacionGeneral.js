
$(document).ready(function () {

    $(function () {
        $('.modal-dialog').draggable({
            handle: ".modal-header"
        });
    });

    //Validar numeros enteros
    $('.ValidarNumeros').inputmask('decimal', { rightAlign: false });

    //Validar numeros con 2 Decimales 
    $('.Validar2Decimales').inputmask('decimal', { radixPoint: '.', groupSeparator: ",", autoGroup: true, allowPlus: false, allowMinus: false, digits: 2, rightAlign: false });

    //Validar numeros con 2 Decimales, si el numero termina en punto se autocompletara los 2 decimales en 00
    $('.Validar2Decimales').bind("blur", function () {
        if ($(this).val()[$(this).val().length - 1] == "." || $(this).val()[$(this).val().length - 1] == ",") {
            $(this).val($(this).val() + '00');
        }
    });

    //Validar que al momento de pegar un monto con valor de miles se copie correctamente
    $('.Validar2Decimales').bind("paste", function (e) {
        $(this).val(e.originalEvent.clipboardData.getData('text').replace(',',''));        
    });

    //Validar numeros con 3 Decimales 
    $('.Validar3Decimales').inputmask('decimal', { radixPoint: '.', groupSeparator: ",", autoGroup: true, allowPlus: false, allowMinus: false, digits: 3, rightAlign: false });
    //Validar numeros con 3 Decimales, si el numero termina en punto se autocompletara los 3 decimales en 000
    $('.Validar2Decimales').bind("blur", function () {
        if ($(this).val()[$(this).val().length - 1] == "." || $(this).val()[$(this).val().length - 1] == ",") {
            $(this).val($(this).val() + '000');
        }
    });

    $(".ValidarTipoDocumentoFactura").inputmask({ "mask": "9999-[A|9]{20}", placeholder: " ", clearMaskOnLostFocus: true });
    //autoUnmask: true,removeMaskOnSubmit: true,
    //Validar Alfabeticos 
    $('.ValidarAlfabeticos').inputmask('Regex', {
        regex: "^[A-Za-zãñõÃÑÕÜÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÄËÏÖÜŸäëïöüÿ\\s]+$"
    });

    //Validar AlfaNumericos
    $('.ValidarAlfaNumericos').inputmask('Regex', {
        regex: "^[A-Za-z0-9ãñõÃÑÕÜÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÄËÏÖÜŸäëïöüÿ\\s]+$"
    });

    // Evento que evaluara si el elemento es Obligatorio
    $('.Obligatorio').on('blur', function (e) {
        var item = $(this);
        // Se evaluara el tipo de elemento 
        if (item.is("input")) {
            switch (item.prop("type")) {
                // Si es input text se validara que no pueda ser vacio
                case 'text':
                    ValidarInputText(item);
                    break;
            }
        }
        if (item.is("Select")) {
            ValidarSelect(item);
        }
    });

    //Funcion que validara todo un formulario que tenga como clase principal ModalFormulario, en donde se evaluara si los elementos que contengan son obligatorios
    ValidarElementos = function (item) {

        $('.' + item).each(function () {
            var itemElement = $(this)
            if (itemElement.is("input")) {
                switch (itemElement.prop("type")) {
                    case 'text':
                        ValidarInputText(itemElement);
                        break;
                    case 'radio':
                        ValidarInputRadio(itemElement);
                        break;
                }
            }
            if (itemElement.is("Select")) {
                ValidarSelect(itemElement);
            }
        });
        if ($('.' + item + '.is-invalidModal').length > 0) {
            return true;
        } else {
            return false;
        }
    }

    // Evento para dar el formato correcto a una fecha
    $(".ValidarFecha").inputmask("99/99/9999", { "placeholder": "dd/mm/yyyy" });

    //Funcion que valida si el elemento Input Text tiene la clase obligatorio, si es asi se mostrara un mensaje en rojo
    ValidarInputText = function (item) {
        if (item.hasClass('Obligatorio')) {
            item.siblings().remove('.MensajeError');
            item.removeClass('is-validModal is-invalidModal');
            if (item.val().trim().length > 0) {
                item.addClass('is-validModal');
            } else {
                item.addClass('is-invalidModal');
                item.parent().append('<div class="invalid-feedbackModal MensajeError">Ingresar ' + item.siblings().text() + '</div>');
            }
        }
    }

    // Si el radio 
    ValidarInputRadio = function (item) {
        if (item.hasClass('Obligatorio')) {
            item.parent().siblings().remove('.MensajeError');
            var _name = item.attr('name');
            if (!$('input:radio[name=' + _name + ']:checked').val()) {
                item.parent().parent().append('<div class="invalid-feedbackModal MensajeError">Seleccionar ' + item.parent().parent().siblings().text() + '</div>');
            }
        }
    }

    //Funcion que valida si el elemento Select tiene la clase obligatorio, si es asi se mostrara un mensaje en rojo
    ValidarSelect = function (item) {
        if (item.hasClass('Obligatorio')) {
            item.siblings().remove('.MensajeError');
            item.removeClass('is-validModal is-invalidModal');
            if (item.val() == '' || item.val() == '0') {
                item.addClass('is-invalidModal')
                item.parent().append('<div class="invalid-feedbackModal MensajeError">Seleccionar ' + item.siblings().text() + '</div>');
            } else {
                item.addClass('is-validModal');
            }
        }
    }

    //Limpiar formulario del grupo de elementos
    LimpiarFormularioModal = function (item) {
        $('.' + item).each(function () {
            var itemElement = $(this)
            if (itemElement.is("input")) {
                switch (itemElement.prop("type")) {
                    case 'text':
                        itemElement.siblings().remove('.MensajeError');
                        itemElement.removeClass('is-validModal is-invalidModal');
                        itemElement.val('');
                        break;
                    case 'radio':
                        itemElement.parent().siblings().remove('.MensajeError');
                        break;
                }
            }
            if (itemElement.is("Select")) {
                itemElement.siblings().remove('.MensajeError');
                itemElement.removeClass('is-validModal is-invalidModal');

                if ($("#" + itemElement.attr('id') + " option[value='']").length) {
                    itemElement.val('');
                } else if ($("#" + itemElement.attr('id') + " option[value='0']").length) {
                    itemElement.val('0');
                }
            }
            if (itemElement.is("textarea")) {
                itemElement.siblings().remove('.MensajeError');
                itemElement.removeClass('is-validModal is-invalidModal');
                itemElement.val('');
            }
        });

    }

    //tipo
    // 0 Correcto
    // 1 Error
    // 2 Alerta
    Mensaje = function (mensaje, tipo) {

        $('.MensajeAlerta').remove();
        var tiempo = 1000;
        switch (tipo) {
            case 0: tiempo = 1000; break;
            case 1: tiempo = 53500; break;
            default: tiempo = 53500;
        }

        var tipos = ['alert-success', 'alert-danger', 'alert-warning'];
        var html = //'<div class="row">' +
                   '<div id="MensajeAlerta" class="MensajeAlerta alert ' + tipos[tipo] + ' alert-dismissible show" role="alert">' +
                   mensaje +
                   '<button type="button" class="close" onclick="CerrarMensaje() aria-label="Close">' +
                   '<span aria-hidden="true">×</span>' +
                   '</button>' +
                   //'</div>' +
                   '</div>';

        var NewDiv = $(html);
        NewDiv.hide().prependTo('body').slideDown('fast');
        setTimeout(function () { CerrarMensaje(); }, tiempo);
        var e = window.event;
        e.stopPropagation();
    }

    //tipo
    // 0 Correcto
    // 1 Error
    // 2 Alerta
    MensajeModal = function (message, tipo) {
        $('#MensajeAlerta').remove();
        var tiempo = 1000;
        switch (tipo) {
            case 0: tiempo = 1000; break;
            case 1: tiempo = 53500; break;
            default: tiempo = 53500;
        }
        var tipos = ['alert-success', 'alert-danger', 'alert-warning'];
        var html = '<div id="MensajeAlerta" class="MensajeAlerta alert ' + tipos[tipo] + ' alert-dismissible fade show" role="alert">' +
                   message +
                   '<button type="button" class="close" onclick="CerrarMensaje("Modal") aria-label="Close">' +
                   '<span aria-hidden="true">×</span>' +
                   '</button>' +
                   '</div>';
        var NewDiv = $(html, { class: 'TypeError', text: message });
        NewDiv.hide().prependTo('.modal').slideDown('fast');
        setTimeout(function () {
            if (tipo == 0) {
                CerrarMensaje('Modal');
            } else {
                CerrarMensaje('NoModal');
            }
        }, tiempo);
        var e = window.event;
        e.stopPropagation();
    }

    $(document).on("click", function (e) {
        var div = document.getElementById('MensajeAlerta');
        var clic = e.target;
        if (clic != div) {
            CerrarMensaje('NoModal');
        }
    });

    CerrarMensaje = function (val) {
        if ($('.MensajeAlerta').length > 0) {
            $(".MensajeAlerta").slideUp();
            setTimeout(function () { $('.MensajeAlerta').remove(); }, 100);
            if (val == 'Modal') {
                $('.modal').modal('hide');
            }
        }
    }

    //Validar Tipo de Documento de un Buscador
    $(".TipoDocumento").on("change", function (event) {

        $(".EvaluarDocumento").removeClass("ValidarNumeros ValidarAlfaNumericos");
        $(".EvaluarDocumento").val('');
        if ($("#" + this.id + " option:selected").val() != '') {


            switch ($("#" + this.id + " option:selected").attr("data-documento").trim()) {
                //DNI
                case "01":
                    $(".EvaluarDocumento").addClass("ValidarNumeros").attr("maxlength", 8);
                    //$('.ValidarNumeros').inputmask('decimal', { rightAlign: false });
                    break;
                    //CARNET DE EXTRANJERIA
                case "04":
                    $(".EvaluarDocumento").addClass("ValidarAlfaNumericos").attr("maxlength", 12);
                    $('.ValidarAlfaNumericos').inputmask('Regex', { regex: "^[A-Za-z0-9ãñõÃÑÕÜÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÄËÏÖÜŸäëïöüÿ\\s]+$" });
                    break;
                    //RUC
                case "06":
                    $(".EvaluarDocumento").addClass("ValidarNumeros").attr("maxlength", 11);
                    $('.ValidarNumeros').inputmask('decimal', { rightAlign: false });
                    break;
                    //PASAPORTE
                case "07":
                    $(".EvaluarDocumento").addClass("ValidarAlfaNumericos").attr("maxlength", 12);
                    $('.ValidarAlfaNumericos').inputmask('Regex', { regex: "^[A-Za-z0-9ãñõÃÑÕÜÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÄËÏÖÜŸäëïöüÿ\\s]+$" });
                    break;
                    //PASAPORTE
                case "11":
                    $(".EvaluarDocumento").addClass("ValidarAlfaNumericos").attr("maxlength", 15);
                    $('.ValidarAlfaNumericos').inputmask('Regex', { regex: "^[A-Za-z0-9ãñõÃÑÕÜÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÄËÏÖÜŸäëïöüÿ\\s]+$" });
                    break;
                    //Otros
                default:
                    $(".EvaluarDocumento").addClass("ValidarAlfaNumericos").attr("maxlength", 15);
                    $('.ValidarAlfaNumericos').inputmask('Regex', { regex: "^[A-Za-z0-9ãñõÃÑÕÜÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÄËÏÖÜŸäëïöüÿ\\s]+$" });
                    break;
            }

        }
    });

    //Validar Tipo Documento para un registro
    $(".TipoDocumentoModal").on("change", function (event) {
        $(".EvaluarDocumentoModal").removeClass("ValidarNumeros ValidarAlfaNumericos ValidarLongitudExacta");
        $(".EvaluarDocumentoModal").val('');
        $(".ValidarLongitudExacta").siblings().remove('.MensajeError');
        $(".ValidarLongitudExacta").removeClass('is-validModal is-invalidModal');
        $('.ValidarLongitudExacta').unbind('blur');


        switch ($("#" + this.id + " option:selected").attr("data-documento").trim()) {
            //DNI
            case "01":
                $(".EvaluarDocumentoModal").addClass("ValidarLongitudExacta ValidarNumerosId").attr("maxlength", 8);
                $('.ValidarNumerosId').inputmask('Regex', { regex: "^[0-9]+$" });
                break;
                //CARNET DE EXTRANJERIA
            case "04":
                $(".EvaluarDocumentoModal").addClass("ValidarAlfaNumericos").attr("maxlength", 12);
                $('.ValidarAlfaNumericos').inputmask('Regex', { regex: "^[A-Za-z0-9ãñõÃÑÕÜÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÄËÏÖÜŸäëïöüÿ\\s]+$" });
                break;
                //RUC
            case "06":
                $(".EvaluarDocumentoModal").addClass("ValidarLongitudExacta ValidarNumerosId").attr("maxlength", 11);
                $('.ValidarNumerosId').inputmask('Regex', { regex: "^[0-9]+$" });
                break;
                //PASAPORTE
            case "07":
                $(".EvaluarDocumentoModal").addClass("ValidarAlfaNumericos").attr("maxlength", 12);
                $('.ValidarAlfaNumericos').inputmask('Regex', { regex: "^[A-Za-z0-9ãñõÃÑÕÜÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÄËÏÖÜŸäëïöüÿ\\s]+$" });
                break;
                //PASAPORTE
            case "11":
                $(".EvaluarDocumentoModal").addClass("ValidarAlfaNumericos").attr("maxlength", 15);
                $('.ValidarAlfaNumericos').inputmask('Regex', { regex: "^[A-Za-z0-9ãñõÃÑÕÜÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÄËÏÖÜŸäëïöüÿ\\s]+$" });
                break;
                //Otros
            default:
                $(".EvaluarDocumentoModal").addClass("ValidarAlfaNumericos").attr("maxlength", 15);
                $('.ValidarAlfaNumericos').inputmask('Regex', { regex: "^[A-Za-z0-9ãñõÃÑÕÜÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÄËÏÖÜŸäëïöüÿ\\s]+$" });
                break;
        }

        //Validar Longitud exacta
        $('.ValidarLongitudExacta').blur(function () {
            var Longitud = $(this).attr('maxlength');
            if ($(this).val().trim().length != Longitud) {
                $(this).siblings().remove('.MensajeError');
                $(this).removeClass('is-validModal is-invalidModal');
                $(this).parent().append('<div class="invalid-feedbackModal MensajeError">Ingresar ' + Longitud + ' dígitos </div>');
            } else {
                $(this).siblings().remove('.MensajeError');
                $(this).removeClass('is-validModal is-invalidModal');
                $(this).addClass('is-validModal');
            }
        });
    });



    //Clase para detectar el enter y disparar el evento click del boton asociado.
    //Utilizar el atributo data-EnterPress Ej: data-EnterPres="btnNombre"
    $(".EnterPress").keypress(function (event) {
        var element = $(this).attr("data-EnterPress");
        var keycode = event.keyCode || event.which;
        if (keycode == 13) {
            $('#' + element).click();
        }
    });

    $(document).on('focus', ':input', function () {
        $(this).attr('autocomplete', 'off');
    });

});

$.fn.datepicker.dates['es'] = {
    days: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
    daysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
    daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "vi", "Sa", "Do"],
    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviember", "Diciembre"],
    monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
};


