$(document).ready(function () {
    ruta = window.location.origin;

    CargaTabla();




    function clearDatatable() {
        var clearTable = $('#tbPartida').DataTable();
        clearTable.clear();
        $('#tbPartida').empty();
        clearTable.destroy();
    }

    function CargaTabla() {

        let dPartida = '';

        dPartida = $("#txtPartida").val();


        if (dPartida == null) {
            dPartida = '';
        }
        else {
            dPartida = $("#txtPartida").val();
        }

        var Datos = {};

        Datos.de_Partida = dPartida;
        Datos.co_GrupoPartida = $("#cboGrupoPartida").val();

        var DTO = {};
        DTO.Datos = Datos;

        var table = null;
        $.ajax({
            method: 'POST',
            url: ruta + '/Partida/Sel_Partida',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(DTO),
            dataType: "json",
            success: function (data) {

                if (data.d !== "[]") {
                    var listData = data;

                    if ($.fn.dataTable.isDataTable('#tbPartida')) {
                        table = $('#tbPartida').DataTable();
                    }
                    else {

                        var item = 0;
                        table = $('#tbPartida').DataTable({
                            "searching": false,
                            "processing": true,
                            "paging": true,
                            "ordering": false,
                            "info": listData.length < 7 ? false : true,
                            "data": listData,
                            "columns": [
                            { 'data': 'de_partida', 'width': '30%' },
                            { 'data': 'de_GrupoPartida', 'width': '30%' },                            
                            {
                                'width': '10%',
                                render: function (data, type, row, meta) {
                                    return '<h6> ' + row["ValorTiempo"] + ' ' + row["de_tabla"] + ' </h6>';
                                }
                            },
                            {
                                'width': '10%',
                                render: function (data, type, row, meta) {
                                    return '<h6> ' + row["sm_moneda"] + ' ' + ConvertirMiles(row["MontoPartida"]) + ' </h6>';
                                }
                            },
                            { 'data': 'tx_valor1', 'width': '10%' },
                            {
                                'width': '10%',
                                "render": function () {
                                    return '<button type="button" id="ButtonEditar" class="editar edit-modal btn btn-warning botonEditar"><span class="fas fa-pencil-alt"></span></button>';
                                }
                            },
                            {
                                'width': '10%',
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

                        editar("#tbPartida tbody", table);
                        eliminar("#tbPartida tbody", table);
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

    ConvertirMiles= function (n) {
        n = n.toString()
        while (true) {
            var n2 = n.replace(/(\d)(\d{3})($|,|\.)/g, '$1,$2$3')
            if (n == n2) break
            n = n2
        }
        return n
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

            $('#hidIdPartida').val(data["co_partida"]);

            $('#txtNombreModal').val(data["de_partida"]);

            $('#cboGrupoPartidaModal').val(data["co_GrupoPartida"]);

            $('#cboTipoTiempo').val(data["TipoTiempo"]);
            $('#txtTiempo').val(data["ValorTiempo"]);
            $('#cboMonedaModal').val(data["co_moneda"]);
            $('#txtMonto').val(data["MontoPartida"]);


            if (data["st_partida"] == 'SI') {
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

            $('#hidIdPartida').val(data["co_partida"]);

            $('#eliminarModal').modal('show');
        })
    }

    var limpiarModal = function () {
        $('#hidIdPartida').val("");
        $('#txtNroDocumentoModal').val("");
        $('#txtNombreModal').val("");
        $('#txtDireccionModal').val("");
        $("#rbnActivo").prop("checked", true);
        $('#cboGrupoPartidaModal').val('');
    }

    var GenerarGrupoPartida = function (DTO, NombreCombo) {


        $.ajax({
            method: 'POST',
            url: ruta + '/GrupoPartida/Sel_ComboGrupoPartida',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(DTO),
            dataType: "json",
            success: function (data) {
                var combo = $("#" + NombreCombo + "");

                combo.find('option').remove();

                combo.append('<option value="" selected>' + 'Seleccione' + '</option>');

                var flag = 0;
                var flagH = 0;

                $(data).each(function (i, v) {
                    combo.append('<option value="' + v.co_GrupoPartida + '">' + v.de_GrupoPartida + '</option>');
                });
            },
            error: function (e) {
                console.log('Error')
                console.log(data);
            }
        });
    }

    var CargaGrupoPartida = function () {
        var table = null;
        var DTO = {};
        GenerarGrupoPartida(DTO, "cboGrupoPartida");
        GenerarGrupoPartida(DTO, 'cboGrupoPartidaModal');
    }

    $('#btnNuevo').click(function () {
        limpiarModal();
        LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
        $('#cboTipoTiempo').val(2);
        $('#cboMonedaModal').val(1);
        $("#hidIdPartida").val('');
    })

    $("#btnGuardarModal").click(function () {
        if (ValidarElementos($('#btnGuardarModal').attr('id'))) {
            return;
        }
        var DTO = {};
        DTO.de_Partida = $("#txtNombreModal").val();
        DTO.co_GrupoPartida = $('#cboGrupoPartidaModal').val();
        DTO.TipoTiempo = $('#cboTipoTiempo').val();
        DTO.ValorTiempo = $('#txtTiempo').val();
        DTO.co_moneda = $('#cboMonedaModal').val();
        DTO.MontoPartida = $('#txtMonto').val();


        if ($("#rbnActivo").is(':checked')) {
            DTO.st_Partida = '1'
        } else {
            DTO.st_Partida = '0'
        }
        let strUrl = "";
        let strMsj = "";

        if ($("#hidIdPartida").val() == '') {
            strUrl = ruta + "/Partida/Ins_Partida";
            strMsj = "Se grabó.";
        }
        else {
            DTO.co_Partida = $("#hidIdPartida").val();
            strUrl = ruta + "/Partida/Upd_Partida";
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
                    $("#hidIdPartida").val('');
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

        DTO.co_Partida = $("#hidIdPartida").val();
        strUrl = ruta + "/Partida/Del_Partida";
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
                    $("#hidIdPartida").val('');
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

    CargarMoneda = function () {
        var data = {
            st_moneda: 1
        };
        var url = '/Moneda/Sel_Moneda';
        var NombreCombo = 'cboMonedaModal';
        var valor = 'co_moneda';
        var descripcion = 'de_moneda';
        LlenarCombo(url, NombreCombo, data, valor, descripcion);
    }

    CargarTipoTiempo = function () {
        var data = {
            co_tabla: 14,
        };
        var url = '/TGeneral/CargaTGeneral';
        var NombreCombo = 'cboTipoTiempo';
        var valor = 'co_codigo';
        var descripcion = 'de_tabla';
        LlenarCombo(url, NombreCombo, data, valor, descripcion);
    }

    LlenarCombo = function (url, NombreCombo, data, valor, descripcion) {
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (data) {
                var combo = $("#" + NombreCombo + "");
                combo.find('option').remove();
                combo.append('<option value="0" selected>' + 'Seleccione' + '</option>');
                $(data).each(function (i, v) {
                    combo.append('<option value="' + v[valor] + '">' + v[descripcion] + '</option>');
                });
            },
            error: function (data) {
                console.log('Error')
                console.log(data);
            }
        });


        axios.post('/Moneda/Sel_Moneda', data).then(response => {
            this.dMoneda = response.data;

        }).catch(error => {
            console.log(error);
            this.errored = true;
        });
    }
    CargarMoneda();
    CargarTipoTiempo();
    CargaGrupoPartida();
});

var ruta = '';
