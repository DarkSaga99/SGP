$(document).ready(function () {

    ruta = window.location.origin;
    CargaTabla();

});

var ruta = '';

function clearDatatable() {
    var Tabla = $('#tbArea').DataTable();
    Tabla.clear();
    $('#tbArea').empty();
    Tabla.destroy();
}

function CargaTabla() {

    var table = null;
    var Datos = {};
    Datos.de_area = $("#txtArea").val();

    $.ajax({
        method: 'POST', url: ruta + '/Area/Sel_Area', contentType: "application/json; charset=utf-8", dataType: "json",
        data: JSON.stringify(Datos),
        success:
            function (data) {

                if (data.d !== "[]") {
                    if ($.fn.dataTable.isDataTable('#tbArea')) {
                        table = $('#tbArea').DataTable();
                    }
                    else {
                        var item = 0;
                        table = $('#tbArea').DataTable({
                            "responsive": true,
                            "searching": false,
                            "processing": true,
                            "paging": true,
                            "ordering": false,
                            "info": data.length < 7 ? false : true,
                            "data": data,
                            "columns": [
                            { 'data': 'co_area', 'className': 'hiddeColumn', 'width': '0%' },
                            { 'data': 'de_area', 'width': '90%' },
                            { 'data': 'st_area', 'className': 'hiddeColumn', 'width': '0%' },
                            { 'data': 'tx_valor1', 'width': '10%' },                            
                            {
                                "render": function () {
                                    return '<button type="button" id="ButtonEditar" class="editar edit-modal btn btn-warning botonEditar"><span class="fas fa-pencil-alt"></span></button>';
                                }
                            },
                            {
                                "render": function () {
                                    return '<button type="button" id="ButtonEliminar" class="eliminar edit-modal btn btn-danger botonEliminar"><span class="fas fa-trash-alt"></span></button>';
                                }
                            },
                            ],
                            "language": {

                                "sProcessing": "Procesando...",
                                "sLengthMenu": "",
                                "sZeroRecords": "No se encontraron resultados",
                                "sEmptyTable": "Ningún dato disponible en esta tabla",
                                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                                "sInfoPostFix": "",
                                "sSearch": "Ingrese palabra clave para filtrar:",
                                "sUrl": "",
                                "sInfoThousands": ",",
                                "sLoadingRecords": "Cargando...",
                                "oPaginate": {
                                    "sFirst": "Primero",
                                    "sLast": "Último",
                                    "sNext": "Siguiente",
                                    "sPrevious": "Anterior"
                                },
                                "oAria": {
                                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                                }
                            }
                        })

                        editar("#tbArea tbody", table);
                        eliminar("#tbArea tbody", table);
                    }

                } else {
                    clearDatatable();
                }
            },
        error: function (e) {
            console.log('Error')
            console.log(data);
        }
    });

    clearDatatable();
}

var editar = function (tbody, table) {
    $(tbody).on("click", "button.editar", function () {
        limpiarModal();
        LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
        if (table.row(this).child.isShown()) {
            var data = table.row(this).data();
        } else {
            var data = table.row($(this).parents("tr")).data();
        }

        $('#hidIdArea').val(data["co_area"]);

        $('#txtNombreModal').val(data["de_area"]);

        if (data["st_area"] == '1') {
            $("#rbnActivo").prop("checked", true);
            $("#rbnInactivo").prop("checked", false);
        }
        else {
            $("#rbnActivo").prop("checked", false);
            $("#rbnInactivo").prop("checked", true);
        }

        $('#exampleModalCenter').modal('show');
        $("#txtNombreModal").first().focus();
    })
}

var eliminar = function (tbody, table) {
    $(tbody).on("click", "button.eliminar", function () {

        if (table.row(this).child.isShown()) {
            var data = table.row(this).data();
        } else {
            var data = table.row($(this).parents("tr")).data();
        }

        $('#hidIdArea').val(data["co_area"]);

        $('#eliminarModal').modal('show');
    })
}

var limpiarModal = function () {
    $('#hidIdArea').val("");
    $('#txtNroDocumentoModal').val("");
    $('#txtNombreModal').val("");
    $('#txtDireccionModal').val("");
    $("#rbnActivo").prop("checked", true);
}

$('#btnNuevo').click(function () {    
    limpiarModal();
    LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
    $("#hidIdArea").val('');
})

$("#btnGuardarModal").click(function () {

    var DTO = {};
    DTO.de_area = $("#txtNombreModal").val();
    if ($("#rbnActivo").is(':checked')) {
        DTO.st_area = '1'
    } else {
        DTO.st_area = '0'
    }

    let strUrl = "";
    let strMsj = "";

    if ($("#hidIdArea").val() == '') {
        strUrl = ruta + "/Area/Ins_Area";
        strMsj = "Se grabó.";
    }
    else {
        DTO.co_area = $("#hidIdArea").val();
        strUrl = ruta + "/Area/Upd_Area";
        strMsj = "Se actualizó.";
    }

    var Datos = {};
    Datos.DTO = DTO;

    $.ajax({
        type: "POST",
        url: strUrl,
        data: JSON.stringify(DTO),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: true,
        success: function (data) {
            if (data == 0) {                
                $("#hidIdArea").val('');
                MensajeModal(strMsj, 0);
                CargaTabla();
            } else {
                MensajeModal(data, 2);
            }
        },
        error: function (data) {
            console.log('Error')
            console.log(data);
        }
    });

});

$("#btnSiModal").click(function () {

    var DTO = {};
    let strUrl = "";
    let strMsj = "";

    DTO.co_area = $("#hidIdArea").val();
    strUrl = ruta + "/Area/Del_Area";
    strMsj = "Se eliminó.";

    var Datos = {};
    Datos.DTO = DTO;

    $.ajax({
        type: "POST",
        url: strUrl,
        data: JSON.stringify(DTO),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: true,
        success: function (data) {
            if (data == 0) {                                
                MensajeModal(strMsj, 0);
                $("#hidIdArea").val('');
                CargaTabla();
            } else {
                MensajeModal(data, 2);
            }
        },
        error: function (data) {
            console.log('Error')
            console.log(data);
        }
    });

});

$('#btnBuscar').click(function () {
    CargaTabla();
})



