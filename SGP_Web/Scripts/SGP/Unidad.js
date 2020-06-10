$(document).ready(function () {
    ruta = window.location.origin;

    CargaTabla();


    function clearDatatable() {
        var clearTable = $('#tbUnidad').DataTable();
        clearTable.clear();
        $('#tbUnidad').empty();
        clearTable.destroy();
    }

    function CargaTabla() {

        let dUnidad = '';

        dUnidad = $("#txtUnidad").val();


        if (dUnidad == null) {
            dUnidad = '';
        }
        else {
            dUnidad = $("#txtUnidad").val();
        }

        var Datos = {};

        Datos.de_unidad = dUnidad;

        var DTO = {};
        DTO.Datos = Datos;

        var table = null;
        $.ajax({
            method: 'POST',
            url: ruta + '/Unidad/Sel_Unidad',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(DTO),
            dataType: "json",
            success: function (data) {

                if (data.d !== "[]") {
                    var listData = data;

                    if ($.fn.dataTable.isDataTable('#tbUnidad')) {
                        table = $('#tbUnidad').DataTable();
                    }
                    else {

                        var item = 0;
                        table = $('#tbUnidad').DataTable({
                            "searching": false,
                            "processing": true,
                            "paging": true,
                            "ordering": false,
                            "info": listData.length < 7 ? false : true,
                            "data": listData,
                            "columns": [
                            { 'data': 'co_unidad', 'className': 'hiddeColumn', 'width': '0%' },
                            { 'data': 'de_unidad', 'width': '80%' },
                            { 'data': 'sm_unidad', 'width': '10%' },
                            { 'data': 'st_unidad', 'className': 'hiddeColumn', 'width': '0%' },
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

                        editar("#tbUnidad tbody", table);
                        eliminar("#tbUnidad tbody", table);
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

            $('#hidIdUnidad').val(data["co_unidad"]);
            $('#txtNombreModal').val(data["de_unidad"]);
            $('#txtAbrevModal').val(data["sm_unidad"]);


            if (data["st_unidad"] == '1') {
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

            $('#hidIdUnidad').val(data["co_unidad"]);

            $('#eliminarModal').modal('show');
        })
    }

    var limpiarModal = function () {
        $('#hidIdUnidad').val("");
        $('#txtNroDocumentoModal').val("");
        $('#txtNombreModal').val("");
        $('#txtDireccionModal').val("");
        $("#rbnActivo").prop("checked", true);
    }

    $('#btnNuevo').click(function () {
        limpiarModal();
        LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
        $("#hidIdUnidad").val('');
    })

    $("#btnGuardarModal").click(function () {
        if (ValidarElementos($('#btnGuardarModal').attr('id'))) {
            return;
        }
        var DTO = {};
        DTO.de_unidad = $("#txtNombreModal").val();
        DTO.sm_unidad = $("#txtAbrevModal").val();

        if ($("#rbnActivo").is(':checked')) {
            DTO.st_unidad = '1'
        } else {
            DTO.st_unidad = '0'
        }
        let strUrl = "";
        let strMsj = "";

        if ($("#hidIdUnidad").val() == '') {
            strUrl = ruta + "/Unidad/Ins_Unidad";
            strMsj = "Se grabó.";
        }
        else {
            DTO.co_unidad = $("#hidIdUnidad").val();
            strUrl = ruta + "/Unidad/Upd_Unidad";
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
                    CargaTabla();
                    $("#hidIdUnidad").val('');
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

        DTO.co_unidad = $("#hidIdUnidad").val();
        strUrl = ruta + "/Unidad/Del_Unidad";
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
                    $("#hidIdUnidad").val('');
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
