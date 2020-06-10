$(document).ready(function () {
    ruta = window.location.origin;

    CargaTabla();


    function clearDatatable() {
        var clearTable = $('#tbTGeneral').DataTable();
        clearTable.clear();
        $('#tbTGeneral').empty();
        clearTable.destroy();
    }

    function CargaTabla() {

        let dTGeneral = '';

        dTGeneral = $("#txtTGeneral").val();


        if (dTGeneral == null) {
            dTGeneral = '';
        }
        else {
            dTGeneral = $("#txtTGeneral").val();
        }

        var Datos = {};

        Datos.de_tabla = dTGeneral;
        Datos.co_tabla = $("#cboTGeneral").val();

        var DTO = {};
        DTO.Datos = Datos;

        var table = null;
        $.ajax({
            method: 'POST',
            url: ruta + '/TGeneral/Sel_TGeneral',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(DTO),
            dataType: "json",
            success: function (data) {

                if (data.d !== "[]") {
                    var listData = data;

                    if ($.fn.dataTable.isDataTable('#tbTGeneral')) {
                        table = $('#tbTGeneral').DataTable();
                    }
                    else {

                        var item = 0;
                        table = $('#tbTGeneral').DataTable({
                            "searching": false,
                            "processing": true,
                            "paging": true,
                            "ordering": false,
                            "info": listData.length < 7 ? false : true,
                            "data": listData,
                            "columns": [
                            { 'data': 'co_codigo', 'className': 'hiddeColumn', 'width': '0%' },
                            { 'data': 'de_tabla', 'width': '30%' },
                            { 'data': 'co_tabla', 'className': 'hiddeColumn', 'width': '0%' },
                            { 'data': 'de_padre', 'width': '20%' },
                            { 'data': 'mo_valor1', 'width': '10%' },
                            { 'data': 'mo_valor2', 'width': '10%' },
                            { 'data': 'mo_valor3', 'width': '10%' },
                            { 'data': 'tx_valor1', 'width': '10%' },
                            { 'data': 'tx_valor2', 'width': '10%' },
                            { 'data': 'tx_valor3', 'width': '10%' },
                            { 'data': 'st_tabla', 'width': '10%' },
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

                        editar("#tbTGeneral tbody", table);
                        eliminar("#tbTGeneral tbody", table);
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

            $('#hidIdTGeneral').val(data["co_codigo"]);

            $('#txtNombreModal').val(data["de_tabla"]);

            $('#cboTGeneralModal').val(data["co_tabla"]);

            $('#txtmo_valor1Modal').val(data["mo_valor1"]);
            $('#txtmo_valor2Modal').val(data["mo_valor2"]);
            $('#txtmo_valor3Modal').val(data["mo_valor3"]);
            $('#tx_valor1Modal').val(data["tx_valor1"]);
            $('#tx_valor2Modal').val(data["tx_valor2"]);
            $('#tx_valor3Modal').val(data["tx_valor3"]);

            if (data["st_tabla"] == 'SI') {
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

            $('#cboTGeneralModal').val(data["co_tabla"]);
            $('#hidIdTGeneral').val(data["co_codigo"]);


            $('#eliminarModal').modal('show');
        })
    }

    var limpiarModal = function () {
        $('#hidIdTGeneral').val("");
        $('#txtNroDocumentoModal').val("");
        $('#txtNombreModal').val("");
        $('#txtmo_valor1Modal').val("");
        $('#txtmo_valor2Modal').val("");
        $('#txtmo_valor3Modal').val("");
        $('#tx_valor1Modal').val("");
        $('#tx_valor2Modal').val("");
        $('#tx_valor3Modal').val("");
        $("#rbnActivo").prop("checked", true);
    }

    var GenerarTGeneral = function (DTO, NombreCombo) {


        $.ajax({
            method: 'POST',
            url: ruta + '/TGeneral/Sel_ComboTGeneral',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(DTO),
            dataType: "json",
            success: function (data) {
                var combo = $("#" + NombreCombo + "");

                combo.find('option').remove();

                //combo.append('<option value="" selected>' + 'Seleccione' + '</option>');

                var flag = 0;
                var flagH = 0;
                //combo.append('<option value="">Seleccione</option>');
                $(data).each(function (i, v) {
                    combo.append('<option value="' + v.co_codigo + '">' + v.de_tabla + '</option>');
                });
            },
            error: function (e) {
                console.log('Error')
                console.log(data);
            }
        });
    }

    var CargaTGeneral = function () {
        var table = null;
        var DTO = {};
        GenerarTGeneral(DTO, "cboTGeneral");
        GenerarTGeneral(DTO, 'cboTGeneralModal');
    }

    $('#btnNuevo').click(function () {
        limpiarModal();
        LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
        $('#cboTGeneralModal').val('');
    })

    $("#btnGuardarModal").click(function () {
        if (ValidarElementos($('#btnGuardarModal').attr('id'))) {
            return;
        }
        var DTO = {};
        DTO.de_tabla = $("#txtNombreModal").val();
        DTO.co_tabla = $('#cboTGeneralModal').val();
        DTO.mo_valor1 = $("#txtmo_valor1Modal").val();
        DTO.mo_valor2 = $("#txtmo_valor2Modal").val();
        DTO.mo_valor3 = $("#txtmo_valor3Modal").val();
        DTO.tx_valor1 = $("#tx_valor1Modal").val();
        DTO.tx_valor2 = $("#tx_valor2Modal").val();
        DTO.tx_valor3 = $("#tx_valor3Modal").val();

        if ($("#rbnActivo").is(':checked')) {
            DTO.st_tabla = '1'
        } else {
            DTO.st_tabla = '0'
        }
        let strUrl = "";
        let strMsj = "";

        if ($("#hidIdTGeneral").val() == '') {
            strUrl = ruta + "/TGeneral/Ins_TGeneral";
            strMsj = "Se grabó.";
        }
        else {
            DTO.co_codigo = $("#hidIdTGeneral").val();

            strUrl = ruta + "/TGeneral/Upd_TGeneral";
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
                    CargaTGeneral();
                    $('#cboTGeneralModal').val('');
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

        DTO.co_tabla = $('#cboTGeneralModal').val();
        DTO.co_codigo = $("#hidIdTGeneral").val();

        strUrl = ruta + "/TGeneral/Del_TGeneral";
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
                    CargaTGeneral();
                    $('#cboTGeneralModal').val('');
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
    });


    CargaTGeneral();
});

var ruta = '';
