$(document).ready(function () {
    ruta = window.location.origin;

    CargaTabla();
    

    function clearDatatable() {
        var clearTable = $('#tbMoneda').DataTable();
        clearTable.clear();
        $('#tbMoneda').empty();
        clearTable.destroy();
    }

    function CargaTabla() {

        let dMoneda = '';

        dMoneda = $("#txtMoneda").val();


        if (dMoneda == null) {
            dMoneda = '';
        }
        else {
            dMoneda = $("#txtMoneda").val();
        }

        var Datos = {};

        Datos.de_moneda = dMoneda;

        var DTO = {};
        DTO.Datos = Datos;

        var table = null;
        $.ajax({
            method: 'POST',
            url: ruta + '/Moneda/Sel_Moneda',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(DTO),
            dataType: "json",
            success: function (data) {

                if (data.d !== "[]") {
                    var listData = data;

                    if ($.fn.dataTable.isDataTable('#tbMoneda')) {
                        table = $('#tbMoneda').DataTable();
                    }
                    else {

                        var item = 0;
                        table = $('#tbMoneda').DataTable({
                            "searching": false,
                            "processing": true,
                            "paging": true,
                            "ordering": false,
                            "info": listData.length < 7 ? false : true,
                            "data": listData,
                            "columns": [
                            { 'data': 'co_moneda', 'className': 'hiddeColumn', 'width': '0%' },
                            { 'data': 'de_moneda', 'width': '80%' },
                            { 'data': 'sm_moneda', 'width': '10%' },
                            { 'data': 'st_moneda', 'className': 'hiddeColumn', 'width': '0%' },
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

                        editar("#tbMoneda tbody", table);
                        eliminar("#tbMoneda tbody", table);
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

            $('#hidIdMoneda').val(data["co_moneda"]);
            $('#txtNombreModal').val(data["de_moneda"]);
            $('#txtAbrevModal').val(data["sm_moneda"]);


            if (data["st_moneda"] == '1') {
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

            $('#hidIdMoneda').val(data["co_moneda"]);

            $('#eliminarModal').modal('show');
        })
    }

    var limpiarModal = function () {
        $('#hidIdMoneda').val("");
        $('#txtNroDocumentoModal').val("");
        $('#txtNombreModal').val("");
        $('#txtDireccionModal').val("");
        $("#rbnActivo").prop("checked", true);
    }

    $('#btnNuevo').click(function () {
        limpiarModal();
        LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
        $("#hidIdMoneda").val('');
    })

    $("#btnGuardarModal").click(function () {

        if (ValidarElementos($('#btnGuardarModal').attr('id'))) {
            return;
        }
        var DTO = {};
        DTO.de_moneda = $("#txtNombreModal").val();
        DTO.sm_moneda = $("#txtAbrevModal").val();

        if ($("#rbnActivo").is(':checked')) {
            DTO.st_moneda = '1'
        } else {
            DTO.st_moneda = '0'
        }
        let strUrl = "";
        let strMsj = "";

        if ($("#hidIdMoneda").val() == '') {
            strUrl = ruta + "/Moneda/Ins_Moneda";
            strMsj = "Se grabó.";
        }
        else {
            DTO.co_moneda = $("#hidIdMoneda").val();
            strUrl = ruta + "/Moneda/Upd_Moneda";
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
                    $("#hidIdMoneda").val('');
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

        DTO.co_moneda = $("#hidIdMoneda").val();
        strUrl = ruta + "/Moneda/Del_Moneda";
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
                    $("#hidIdMoneda").val('');
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

    $('#btnBuscar').click(function () {
        CargaTabla();
    })

});

var ruta = '';
