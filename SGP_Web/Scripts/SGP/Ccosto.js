$(document).ready(function () {
    ruta = window.location.origin;
    CargaTabla();


    function clearDatatable() {
        var clearTable = $('#tbCcosto').DataTable();
        clearTable.clear();
        $('#tbCcosto').empty();
        clearTable.destroy();
    }

    function CargaTabla() {

        let dCcosto = '';

        dCcosto = $("#txtCcosto").val();


        if (dCcosto == null) {
            dCcosto = '';
        }
        else {
            dCcosto = $("#txtCcosto").val();
        }

        var Datos = {};

        Datos.de_ccosto = dCcosto;

        var DTO = {};
        DTO.Datos = Datos;

        var table = null;
        $.ajax({
            method: 'POST',
            url: ruta + '/Ccosto/Sel_Ccosto',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(DTO),
            dataType: "json",
            success: function (data) {

                if (data.d !== "[]") {
                    var listData = data;

                    if ($.fn.dataTable.isDataTable('#tbCcosto')) {
                        table = $('#tbCcosto').DataTable();
                    }
                    else {

                        var item = 0;
                        table = $('#tbCcosto').DataTable({
                            "searching": false,
                            "processing": true,
                            "paging": true,
                            "ordering": false,
                            "info": listData.length < 7 ? false : true,
                            "data": listData,
                            "columns": [
                            { 'data': 'co_ccosto', 'className': 'hiddeColumn', 'width': '0%' },
                            { 'data': 'de_ccosto', 'width': '90%' },
                            { 'data': 'st_ccosto', 'className': 'hiddeColumn', 'width': '0%' },
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

                        editar("#tbCcosto tbody", table);
                        eliminar("#tbCcosto tbody", table);
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

            $('#hidIdCcosto').val(data["co_ccosto"]);

            $('#txtNombreModal').val(data["de_ccosto"]);

            if (data["st_ccosto"] == '1') {
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

            $('#hidIdCcosto').val(data["co_ccosto"]);

            $('#eliminarModal').modal('show');
        })
    }

    var limpiarModal = function () {
        $('#hidIdCcosto').val("");
        $('#txtNroDocumentoModal').val("");
        $('#txtNombreModal').val("");
        $('#txtDireccionModal').val("");
        $("#rbnActivo").prop("checked", true);
    }

    $('#btnNuevo').click(function () {

        limpiarModal();
        LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
        $("#hidIdCcosto").val('');
    })

    $("#btnGuardarModal").click(function () {

        if (ValidarElementos($('#btnGuardarModal').attr('id'))) {
            return;
        }
        var DTO = {};
        DTO.de_ccosto = $("#txtNombreModal").val();
        if ($("#rbnActivo").is(':checked')) {
            DTO.st_ccosto = '1'
        } else {
            DTO.st_ccosto = '0'
        }
        let strUrl = "";
        let strMsj = "";

        if ($("#hidIdCcosto").val() == '') {
            strUrl = ruta + "/Ccosto/Ins_Ccosto";
            strMsj = "Se grabó.";
        }
        else {
            DTO.co_ccosto = $("#hidIdCcosto").val();
            strUrl = ruta + "/Ccosto/Upd_Ccosto";
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

                    MensajeModal(strMsj, 0);
                    $("#hidIdCcosto").val('');
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

        DTO.co_ccosto = $("#hidIdCcosto").val();
        strUrl = ruta + "/Ccosto/Del_Ccosto";
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
                    $("#hidIdCcosto").val('');
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
