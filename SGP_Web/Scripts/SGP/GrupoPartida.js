$(document).ready(function () {
    ruta = window.location.origin;

    CargaTabla();


    function clearDatatable() {
        var clearTable = $('#tbGrupoPartida').DataTable();
        clearTable.clear();
        $('#tbGrupoPartida').empty();
        clearTable.destroy();
    }

    function CargaTabla() {

        let dGrupoPartida = '';

        dGrupoPartida = $("#txtGrupoPartida").val();


        if (dGrupoPartida == null) {
            dGrupoPartida = '';
        }
        else {
            dGrupoPartida = $("#txtGrupoPartida").val();
        }

        var Datos = {};

        Datos.de_GrupoPartida = dGrupoPartida;

        var DTO = {};
        DTO.Datos = Datos;

        var table = null;
        $.ajax({
            method: 'POST',
            url: ruta + '/GrupoPartida/Sel_GrupoPartida',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(DTO),
            dataType: "json",
            success: function (data) {

                if (data.d !== "[]") {
                    var listData = data;

                    if ($.fn.dataTable.isDataTable('#tbGrupoPartida')) {
                        table = $('#tbGrupoPartida').DataTable();
                    }
                    else {

                        var item = 0;
                        table = $('#tbGrupoPartida').DataTable({
                            "searching": false,
                            "processing": true,
                            "paging": true,
                            "ordering": false,
                            "info": listData.length < 7 ? false : true,
                            "data": listData,
                            "columns": [
                            { 'data': 'co_GrupoPartida', 'className': 'hiddeColumn', 'width': '0%' },
                            { 'data': 'de_GrupoPartida', 'width': '90%' },
                            { 'data': 'st_GrupoPartida', 'className': 'hiddeColumn', 'width': '0%' },
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

                        editar("#tbGrupoPartida tbody", table);
                        eliminar("#tbGrupoPartida tbody", table);
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

            $('#hidIdGrupoPartida').val(data["co_GrupoPartida"]);

            $('#txtNombreModal').val(data["de_GrupoPartida"]);

            if (data["st_GrupoPartida"] == '1') {
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

            $('#hidIdGrupoPartida').val(data["co_GrupoPartida"]);

            $('#eliminarModal').modal('show');
        })
    }

    var limpiarModal = function () {
        $('#hidIdGrupoPartida').val("");
        $('#txtNroDocumentoModal').val("");
        $('#txtNombreModal').val("");
        $('#txtDireccionModal').val("");
        $("#rbnActivo").prop("checked", true);
    }

    $('#btnNuevo').click(function () {
        limpiarModal();
        LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
        $("#hidIdGrupoPartida").val('');
    })

    $("#btnGuardarModal").click(function () {
        if (ValidarElementos($('#btnGuardarModal').attr('id'))) {
            return;
        }
        var DTO = {};
        DTO.de_GrupoPartida = $("#txtNombreModal").val();
        
        if ($("#rbnActivo").is(':checked')) {
            DTO.st_GrupoPartida = '1'
        } else {
            DTO.st_GrupoPartida = '0'
        }

        let strUrl = "";
        let strMsj = "";

        if ($("#hidIdGrupoPartida").val() == '') {
            strUrl = ruta + "/GrupoPartida/Ins_GrupoPartida";
            strMsj = "Se grabó.";
        }
        else {
            DTO.co_GrupoPartida = $("#hidIdGrupoPartida").val();
            strUrl = ruta + "/GrupoPartida/Upd_GrupoPartida";
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
                    $("#hidIdGrupoPartida").val('');
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

        DTO.co_GrupoPartida = $("#hidIdGrupoPartida").val();
        strUrl = ruta + "/GrupoPartida/Del_GrupoPartida";
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
                    CargaTabla();
                    $("#hidIdGrupoPartida").val('');
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
