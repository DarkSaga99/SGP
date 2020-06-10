$(document).ready(function () {

    var app = new Vue({
        el: '#app',
        data: {
            tituloModal: '',
            dMoneda: [],
            dTipoCosto: [],
            dMonedaLocal: [],
            dTipoCambio: [],
            dCentroCosto:[],
            idRecurso: 0,
            idEquipo: 0,
            idRecursoEquipo: 0,
            TituloTipoCosto: '',
            TituloTipoCostoModal: '',
            selectedMoneda: '',
            CodigoCostoDirecto: 0,
            SimboloMondaLocal:'',
        },
        methods: {
            ListaTipoCosto: function () {
                var data = {
                    co_tabla: 19,
                };
                axios.post('/TGeneral/CargaTGeneral', data).then(response => {
                    this.dTipoCosto = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListaMonedaLocal: function () {
                var data = {
                    co_tabla: 20,
                };
                axios.post('/TGeneral/CargaTGeneral', data).then(response => {
                    this.dMonedaLocal = response.data;
                    var Moneda = this.dMoneda;

                    var SimboloMonda 
                    $.each(Moneda, function (i, v) {
                        if (v['co_moneda'] == response.data[0]['de_tabla']) {
                            app.SimboloMondaLocal = v['sm_moneda'];
                            return false;
                        }
                    });
                    this.ListarTabla();
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarMoneda: function () {
                var data = {
                    st_moneda: 1,
                };
                axios.post('/Moneda/Sel_Moneda', data).then(response => {
                    this.dMoneda = response.data;
                    this.ListaMonedaLocal();
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarTipoCambio: function () {
                var data = {
                    //st_moneda: 1,
                };
                axios.post('/TipoCambio/CargaGrilla', data).then(response => {
                    this.dTipoCambio = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarCentroCosto: function () {
                var data = {
                    //st_moneda: 1,
                };
                axios.post('/Ccosto/Sel_Ccosto', data).then(response => {
                    this.dCentroCosto = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarTabla: function () {

                var Datos = {};
                Datos.TipoCosto = $('#cboTipoCosto').val();
                Datos.Fecha = $('#txtFecha').val();
                Datos.CodigoMoneda = $('#cboMoneda').val();
                //Datos.de_tabla = $('#txtDescripcion').val();
                

                var table = null;
                this.clearDatatable();

                axios.post('/CostoDirecto/CargaGrilla', Datos).then(response => {
                    var listData = response.data;
                    if (listData.length > 0) {
                        if ($.fn.dataTable.isDataTable('#tbTabla')) {
                            table = $('#tbTabla').DataTable();
                        }
                        else {
                            var item = 0;
                            table = $('#tbTabla').DataTable({
                                "searching": false,
                                "processing": true,
                                "paging": true,
                                "ordering": false,
                                "info": listData.length < 7 ? false : true,
                                "data": listData,
                                "columns": [
                                { 'data': 'Fecha', 'width': '10%' },
                                {
                                    'width': '40%',
                                    "render": function (data, type, row, meta) {
                                        var html = '';
                                        if (row["TipoCosto"] == 1) {
                                            html = row['de_recurso'];
                                        } else if (row["TipoCosto"] == 2) {
                                            html = row['DescripcionEquipo'];
                                        }

                                        return '<h6> ' + html + ' </h6>';
                                    }
                                },
                                {
                                    'width': '10%',
                                    "render": function (data, type, row, meta) {
                                        return '<h6> ' + row["sm_moneda"] + ' ' + app.ConvertirMiles(row["TipoCambio"]) + ' </h6>';
                                    }
                                },
                                {
                                    'width': '10%',
                                    "render": function (data, type, row, meta) {
                                        return '<h6> ' + row["sm_moneda"] + ' ' + app.ConvertirMiles(row["Importe"]) + ' </h6>';
                                    }
                                },
                                {
                                    'width': '10%',
                                    "render": function (data, type, row, meta) {
                                        return '<h6>' + app.SimboloMondaLocal +' ' + app.ConvertirMiles(row["CostoLocal"]) + ' </h6>';
                                    }
                                },
                                {
                                    'width': '5%',
                                    "render": function () {
                                        return '<button type="button" id="ButtonEditar" class="editar edit-modal btn btn-warning botonEditar"><span class="fas fa-pencil-alt"></span></button>';
                                    }
                                },
                                {
                                    'width': '5%',
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
                            });
                            //eliminar("#tbCliente tbody", table);
                        }

                    } else {
                        this.clearDatatable();
                    }


                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });

            },
            ListarRecusoEquipo: function () {
                if ($('#cboTipoCostoModal').val() == 0) {
                    MensajeModal('Seleccione un Tipo de Costo', 2);
                    return false;
                }
                $('#exampleModalCenter').modal('hide');
                if ($('#cboTipoCostoModal').val() == 1) {
                    $('#appBuscadorRecurso .BuscadorRecurso').modal('show');

                } else if ($('#cboTipoCostoModal').val() == 2) {
                    $('#appBuscadorEquipo .BuscadorEquipo').modal('show');
                }
            },
            clearDatatable: function () {
                var clearTable = $('#tbTabla').DataTable();
                clearTable.clear();
                $('#tbTabla').empty();
                clearTable.destroy();
            },
            Guardar: function () {
                if (ValidarElementos($('#btnGuardarModal').attr('id'))) {
                    return;
                }
                var DTO = {};
                var strUrl = "";
                var strMsj = "";

                DTO.Fecha = $('#txtFechaModal').val();
                DTO.TipoCosto = $('#cboTipoCostoModal').val();
                DTO.CodigoMoneda = $('#cboMonedaModal').val();
                DTO.Importe = $('#txtImporteModal').val().replace(/,/g, '');
                DTO.CostoLocal = $('#txtCostoLocalModal').val().replace(/,/g, '');
                DTO.TipoCambio = $('#txtTipoCambioModal').val().replace(/,/g, '');
                DTO.CodigoCentroCosto = $('#cboCentroCosto').val();
                DTO.Observacion = $('#txtObservacionModal').val();

                if ($('#cboTipoCostoModal').val() == 1) {
                    DTO.CodigoRecurso = this.idRecurso;

                } else if ($('#cboTipoCostoModal').val() == 2) {
                    DTO.CodigoEquipo = this.idEquipo;
                    DTO.CodigoEquipoRecurso = this.idRecursoEquipo;
                }


                if (this.CodigoCostoDirecto == '') {
                    strUrl = "/CostoDirecto/Ins_CostoDirecto";
                    strMsj = "Se grabó correctamente.";
                }
                else {
                    DTO.CodigoCostoDirecto = this.CodigoCostoDirecto;
                    strUrl = "/CostoDirecto/Upd_CostoDirecto";
                    strMsj = "Se actualizó correctamente.";
                }

                var Datos = {};
                Datos.DTO = DTO;

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {
                        this.CodigoCostoDirecto = '';
                        MensajeModal(strMsj, 0);
                        this.ListarTabla();
                    } else {
                        MensajeModal(response.data, 2);
                    }
                }).catch(error => {
                    MensajeModal(error, 0);
                    console.log(error)
                    this.errored = true
                });
            },
            editar: function (data) {
                LimpiarFormularioModal($('#btnGuardarModal').attr('id'));

                this.tituloModal = 'Editar Costo Directo';
                //
                this.CodigoCostoDirecto = data['CodigoCostoDirecto'];
                $('#txtFechaModal').val(data['Fecha']);
                $('#cboTipoCostoModal').val(data['TipoCosto']);
                $('#cboMonedaModal').val(data['CodigoMoneda']);
                $('#txtImporteModal').val(data['Importe']);
                $('#txtCostoLocalModal').val(data['CostoLocal']);
                $('#txtTipoCambioModal').val(data['TipoCambio']);
                $('#cboCentroCosto').val(data['CodigoCentroCosto']);
                $('#txtObservacionModal').val(data['Observacion']);

                if ($('#cboTipoCostoModal').val() == 1) {
                    this.idRecurso = data['CodigoRecurso'];
                    $('#txtDescripcionTipoCosto').val(data['de_recurso']);
                } else if ($('#cboTipoCostoModal').val() == 2) {
                    this.idEquipo = data['CodigoEquipo'];
                    this.idRecursoEquipo = data['CodigoEquipoRecurso'];
                    $('#txtDescripcionTipoCosto').val(data['DescripcionEquipo']);
                }
                //
                $('#exampleModalCenter').modal('show');
            },
            nuevo: function () {
                LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
                this.tituloModal = 'Nuevo Costo Directo';
                var date = new Date();
                var yyyy = date.getFullYear().toString();
                var mm = (date.getMonth() + 1).toString();
                var dd = date.getDate().toString();
                $('#txtFechaModal').val((dd[1] ? dd : "0" + dd[0]) + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + yyyy);
                $('#exampleModalCenter').modal('show');
            },
            eliminar: function (data) {

                this.CodigoCostoDirecto = data["CodigoCostoDirecto"];
                $('#eliminarModal').modal('show');
            },
            SiModal: function () {
                var DTO = {};
                let strUrl = "";
                let strMsj = "";

                DTO.CodigoCostoDirecto = this.CodigoCostoDirecto;
                strUrl = "/CostoDirecto/Del_CostoDirecto";
                strMsj = "Se eliminó.";

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {
                        this.CodigoCostoDirecto = '';
                        MensajeModal('Se elimino correctamente.', 0);
                        this.ListarTabla();
                    } else {
                        MensajeModal(response.data, 2);
                    }
                }).catch(error => {
                    console.log(error)
                    this.errored = true
                });
            },
            Salir: function () {
                $('#exampleModalCenter').modal('hide');
            },
            ConvertirMiles: function (n) {
                n = n.toString()
                while (true) {
                    var n2 = n.replace(/(\d)(\d{3})($|,|\.)/g, '$1,$2$3')
                    if (n == n2) break
                    n = n2
                }
                return n
            },
            ObtenerTipoCambio: function () {
                var _TipoCambio = this.dTipoCambio;
                var Mindate = new Date(0);
                var PrecioVenta = 0;
                var dato = $.grep(_TipoCambio, function (p) {
                    if (p.CodigoMoneda == $('#cboMonedaModal').val()) {
                        var from = p.Fecha.split("/");
                        var date = new Date(from[2], from[1] - 1, from[0]);
                        if (date > Mindate) {
                            Mindate = date;
                            PrecioVenta = p.PrecioVenta;
                        }
                        return PrecioVenta;
                    }
                });
                $('#txtImporteModal').val('');
                $('#txtCostoLocalModal').val('');

                $('#txtTipoCambioModal').val(PrecioVenta);

            },
            SeleccionTipoCostoModal: function () {
                if ($('#cboTipoCostoModal').val() == 1) {
                    this.TituloTipoCostoModal = 'Nombre del Recurso'
                } else if ($('#cboTipoCostoModal').val() == 2) {
                    this.TituloTipoCostoModal = 'Nombre del Equipo'
                }
            },
            SeleccionTipoCosto: function () {
                if ($('#cboTipoCosto').val() == 1) {
                    this.TituloTipoCostoModal = 'Nombre del Recurso'
                } else if ($('#cboTipoCosto').val() == 2) {
                    this.TituloTipoCostoModal = 'Nombre del Equipo'
                }
            },
            CalcularCostoLocal: function () {
                if ($('#txtImporteModal').val().length == 0 || $('#txtTipoCambioModal').val().length == 0) {
                    return;
                }
                var Calculo = parseFloat($('#txtImporteModal').val().replace(/,/g, '')) * parseFloat($('#txtTipoCambioModal').val());
                $('#txtCostoLocalModal').val(Calculo);
            }
        },
        created: function () {
            
            this.ListarMoneda();
            this.ListaTipoCosto();
            this.ListarTipoCambio();
            this.ListarCentroCosto();
            
        },
    });


    $("#tbTabla").on("click", "button.editar", function () {

        var table = $('#tbTabla').DataTable();
        var data = null;
        if (table.row(this).child.isShown()) {
            data = table.row(this).data();
        } else {
            data = table.row($(this).parents("tr")).data();
        }
        app.editar(data);
    });

    $("#tbTabla").on("click", "button.eliminar", function () {
        var table = $('#tbTabla').DataTable();
        if (table.row(this).child.isShown()) {
            var data = table.row(this).data();
        } else {
            var data = table.row($(this).parents("tr")).data();
        }
        app.eliminar(data);
    });

    EjecutarListar = function (data) {
        if ($('#cboTipoCostoModal').val() == 1) {
            app.idRecurso = data["co_recurso"];
            $('#txtDescripcionTipoCosto').val(data["de_recurso"]);
            $('#appBuscadorRecurso .BuscadorRecurso').modal('hide');
        } else if ($('#cboTipoCostoModal').val() == 2) {
            app.idEquipo = data["CodigoEquipo"];
            app.idRecursoEquipo = data["CodigoRecursoAsociado"];
            $('#txtDescripcionTipoCosto').val(data["DescripcionEquipo"]);
            $('#appBuscadorEquipo .BuscadorEquipo').modal('hide');
        }
        $('#exampleModalCenter').modal('show');
    };

    CancelarBusqueda = function () {
        app.idRecurso = 0;
        $('#txtDescripcionTipoCosto').val('');
        $('#exampleModalCenter').modal('show');
    }

    $('#txtFecha').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: "es",
    });

    $('#txtFechaModal').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: "es",
    });


});


