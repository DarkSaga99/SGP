$(document).ready(function () {
    


    var appCronogramaEjecucion = new Vue({
        el: '#appCronogramaEjecucion',
        data: {
            dEstadoCronograma: [],
            dTipoDocumento: [],
            IdCronogramaEjecucion: '',
            IdCronogramaPago: 0,
            selectTipoDocumento: 0,
            tituloModal: 'Nuevo Cronograma Ejecución',
            IdProyecto: '',
            desProyeto: '',
            SimboloMoneda: '',
            IdMoneda: '',
            ImporteFacturacion: 0,
            SaldoTotal: '',
            FlagBotonNuevo : false,
        },
        methods: {
            ListarEstadosCronograma: function () {
                var data = {
                    co_tabla: 11,
                };
                axios.post('/TGeneral/CargaTGeneral', data).then(response => {
                    this.dEstadoCronograma = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarTipoDocumento: function () {
                var data = {
                    co_tabla: 12,
                };
                axios.post('/TGeneral/CargaTGeneral', data).then(response => {
                    this.dTipoDocumento = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            Guardar: function () {
                if (ValidarElementos($('#btnGuardarModal').attr('id'))) {
                    return;
                }

                var table = $('#tbPrincipal').DataTable();
                var sum_montoCP = 0;
                var nroCuota = $("#txtCuota").val();
                var contador_cuota = 0;
                var max_Cuota = 0;
                var _CPPosicion = this.CPPosicion

                table.column(4).data().each(function (value, index) {
                    sum_montoCP += value;
                });
                sum_montoCP = sum_montoCP - this.ImporteFacturacion;

                if (parseFloat($('#txtMontoTotal').val().replace(',', '')) < sum_montoCP + parseFloat($("#txtImporteFacturacion").val().replace(',', ''))) {
                    MensajeModal("EL monto acumulado hasta el momento es de " + sum_montoCP + " mas el monto ingresado " + parseFloat($("#txtImporteFacturacion").val().replace(',', '')) + ", supera al monto total del proyecto " + parseFloat($('#txtMontoTotal').val().replace(',', '')) + ".", 2);
                    return;
                }
                if (contador_cuota > 0) {
                    MensajeModal("El número de cuota ingresada ya existe, por favor ingrese otra donde la ultima cuota es " + max_Cuota + ".", 2);
                    return;
                }

                var DTO = {};
                var strUrl = "";
                var strMsj = "";
                DTO.co_proyecto = this.IdProyecto;
                DTO.nu_ordencompra = $("#txtOrdenCompra").val();
                DTO.so_interna = $("#txtSolicitudInterna").val();
                DTO.nu_recepcion = $("#txtNrRecepcion").val();
                DTO.mo_importefacturacion = parseFloat($("#txtImporteFacturacion").val().replace(',', ''));
                DTO.co_moneda = this.IdMoneda;
                DTO.fe_Ordenfacturacion = $("#txtFechaOrdenFacturacion").val();
                DTO.fe_facturacion = $("#txtFechaFacturacion").val();
                DTO.nu_facturacion = $("#txtNumeroDocumento").val();
                DTO.st_cronogramaejecucion = $('#cboEstadoCronograma').val();

                DTO.HitoCronogramaEjecucion = $('#txtHito').val();
                DTO.ObservacionCronogramaEjecucion = $('#txtObservacionCronograma').val();
                DTO.co_cronogramapago = this.IdCronogramaPago;

                if (this.IdCronogramaEjecucion == '') {
                    strUrl = "/CronogramaEjecucion/Ins_CronogramaEjecucion";
                    strMsj = "Se grabó correctamente.";
                }
                else {
                    DTO.co_cronogramaejecucion = this.IdCronogramaEjecucion;
                    strUrl = "/CronogramaEjecucion/Upd_CronogramaEjecucion";
                    strMsj = "Se actualizó correctamente.";
                }

                var Datos = {};
                Datos.DTO = DTO;

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {
                        this.IdCronogramaEjecucion = '';
                        MensajeModal(strMsj, 0);
                        this.ListarTablaCronogramaPago();
                    } else {
                        MensajeModal(response.data, 2);
                    }
                }).catch(error => {
                    MensajeModal(error, 1);
                    console.log(error)
                    this.errored = true
                });
            },
            Buscar: function () {
                if (!ValidarElementos($('#btnBuscar').attr('id'))) {
                    this.ListarTabla();
                }
            },
            ListarTabla: function () {

                var Datos = {};
                Datos.co_proyecto = this.IdProyecto;
                var _SimboloMoneda = this.SimboloMoneda;

                var table = null;
                var sum_montoCP = 0;
                this.clearDatatable('tbPrincipal');

                axios.post('/CronogramaEjecucion/CargaGrilla', Datos).then(response => {
                    var listData = response.data;
                    if (listData !== "[]") {
                        if ($.fn.dataTable.isDataTable('#tbPrincipal')) {
                            table = $('#tbPrincipal').DataTable();
                        }
                        else {
                            var item = 0;
                            table = $('#tbPrincipal').DataTable({
                                "searching": false,
                                "processing": true,
                                "paging": true,
                                "pageLength": 10,
                                "ordering": false,
                                "info": listData.length < 7 ? false : true,
                                "data": listData,
                                "columns": [
                                { 'data': 'mo_importefacturacion', 'className': 'd-none', render: $.fn.dataTable.render.number(',', '.', 2, '') },
                                { 'data': 'so_interna', 'width': '10%' },
                                { 'data': 'nu_ordencompra', 'width': '5%' },
                                { 'data': 'nu_recepcion', 'width': '10%' },
                                { 'data': 'HitoCronogramaEjecucion', 'width': '20%' },
                                {
                                    "render": function (data, type, row, meta) {
                                        return '<h6> ' + row["tx_valor2"] + ' ' + appCronogramaEjecucion.ConvertirMiles(row["mo_importefacturacion"]) + ' </h6>';
                                    }
                                },
                                { 'data': 'fe_Ordenfacturacion', 'width': '5%' },
                                { 'data': 'fe_facturacion', 'width': '5%' },
                                { 'data': 'nu_facturacion', 'width': '5%' },
                                { 'data': 'tx_valor1', 'width': '5%' },
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
                            table.column(0).data().each(function (value, index) {
                                sum_montoCP += value;
                            });
                            $("#txtImporteTotal").text(_SimboloMoneda + " " + this.ConvertirMiles(sum_montoCP));
                            sum_montoCP = this.ConvertirMiles(parseFloat($('#txtMontoTotal').val().replace(',', '') - sum_montoCP));
                            this.SaldoTotal = sum_montoCP;
                        }

                    } else {
                        this.clearDatatable('tbPrincipal');
                    }


                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });

            },
            ListarTablaCronogramaPago: function () {

                var Datos = {};
                Datos.co_proyecto = this.IdProyecto;
                Datos.st_cronograma = 1;

                var _SimboloMoneda = this.SimboloMoneda;
                var table = null;
                this.clearDatatable('tbCronogramaPago');

                axios.post('/CronogramaPago/CargaGrilla', Datos).then(response => {
                    var listData = response.data;
                    if (listData !== "[]") {
                        if ($.fn.dataTable.isDataTable('#tbCronogramaPago')) {
                            table = $('#tbCronogramaPago').DataTable();
                        }
                        else {
                            var item = 0;

                            table = $('#tbCronogramaPago').DataTable({
                                "searching": false,
                                "processing": true,
                                "paging": true,
                                "pageLength": 5,
                                "ordering": false,
                                "info": listData.length < 7 ? false : true,
                                "data": listData,
                                "columns": [
                                { 'data': 'nu_hito', 'width': '5%' },
                                { 'data': 'de_hito', 'width': '30%' },
                                { 'data': 'fe_programada', 'width': '10%' },
                                {
                                    'data': 'tx_valor1', 'width': '10%',
                                    "render": function (data, type, row, meta) {
                                        return '<h6> ' + row["tx_valor1"] + ' ' + appCronogramaEjecucion.ConvertirMiles(row["mo_importe"]) + ' </h6>';
                                    }
                                },
                                { 'data': 'nu_oc', 'width': '10%' },
                                { 'data': 'nu_recepcion', 'width': '10%' },
                                { 'data': 'so_interna', 'width': '10%' },
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

                            $('#tbCronogramaPago tbody').on('click', 'tr', function () {
                                var table = $('#tbCronogramaPago').DataTable();
                                var data = table.row(this).data();

                                LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
                                appCronogramaEjecucion.tituloModal = 'Nuevo Cronograma Ejecución';

                                appCronogramaEjecucion.ImporteFacturacion = data["mo_importefacturacion"];

                                //$("#txtOrdenCompra").val(data["nu_ordencompra"]);
                                //$("#txtSolicitudInterna").val(data["so_interna"]);
                                //$("#txtNrRecepcion").val(data["nu_recepcion"]);

                                $("#txtImporteFacturacion").val(data["mo_importe"]);
                                $('#txtHito').val(data["de_hito"]);
                                $("#txtImporteFacturacion").attr('readOnly', true);
                                $("#txtHito").attr('readOnly', true);

                                appCronogramaEjecucion.IdCronogramaPago = data["id_cronograma"];

                                var date = new Date();
                                var yyyy = date.getFullYear().toString();
                                var mm = (date.getMonth() + 1).toString();
                                var dd = date.getDate().toString();
                                $('#txtFechaOrdenFacturacion').val((dd[1] ? dd : "0" + dd[0]) + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + yyyy);
                                $('#cboEstadoCronograma').val('2');

                                $('#exampleCronogramaEModalCenter').modal('show');
                            });

                            table.$('tr').each( function() {
                                this.setAttribute('title', 'Click para agregar pago ');
                            } );

                            table.$('tr').tooltip({
                                "delay": 0,
                                "track": true,
                                "fade": 250,
                                "placement": 'bottom'
                                
                            });


                        }

                    } else {
                        this.clearDatatable('tbCronogramaPago');
                    }
                    this.ListarTabla();
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });

            },
            clearDatatable: function (nombreTabla) {
                var clearTable = $('#' + nombreTabla ).DataTable();
                clearTable.clear();
                $('#' + nombreTabla ).empty();
                clearTable.destroy();
            },

            editar: function (data) {

                $("#txtImporteFacturacion").attr('readOnly', false);
                $("#txtHito").attr('readOnly', false);
                this.IdCronogramaPago = 0;

                LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
                this.tituloModal = 'Editar Cronograma Ejecución';

                this.ImporteFacturacion = data["mo_importefacturacion"];

                $("#txtOrdenCompra").val(data["nu_ordencompra"]);
                $("#txtSolicitudInterna").val(data["so_interna"]);
                $("#txtNrRecepcion").val(data["nu_recepcion"]);
                $("#txtFechaOrdenFacturacion").val(data["fe_Ordenfacturacion"]);
                $("#txtFechaFacturacion").val(data["fe_facturacion"]);
                $("#txtImporteFacturacion").val(data["mo_importefacturacion"]);
                $("#txtNumeroDocumento").val(data["nu_facturacion"]);
                $('#cboEstadoCronograma').val(data["st_cronogramaejecucion"]);
                $('#txtHito').val(data["HitoCronogramaEjecucion"]);
                $('#txtObservacionCronograma').val(data["ObservacionCronogramaEjecucion"]);
                this.IdCronogramaEjecucion = data["co_cronogramaejecucion"];


                $('#exampleCronogramaEModalCenter').modal('show');
                $("#txtOrdenCompra").first().focus();

            },
            nuevo: function () {
                if (this.IdProyecto == '') {
                    Mensaje('Seleccione un proyecto', 2);
                    return;
                }
                $("#txtImporteFacturacion").attr('readOnly', false);
                $("#txtHito").attr('readOnly', false);
                this.IdCronogramaPago = 0;

                this.tituloModal = 'Nuevo Cronograma Ejecución';
                LimpiarFormularioModal($('#btnGuardarModal').attr('id'));

                var date = new Date();
                var yyyy = date.getFullYear().toString();
                var mm = (date.getMonth() + 1).toString();
                var dd = date.getDate().toString();
                $('#txtFechaOrdenFacturacion').val((dd[1] ? dd : "0" + dd[0]) + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + yyyy);
                $('#cboEstadoCronograma').val('2');

                this.ImporteFacturacion = 0;
                $('#exampleCronogramaEModalCenter').modal('show');

                this.IdCronogramaEjecucion = '';
            },            
            Salir: function () {
                $('#exampleCronogramaEModalCenter').modal('hide');
            },
            eliminar: function (data) {

                this.IdCronogramaEjecucion = data["co_cronogramaejecucion"];
                $('#eliminarCronogramaEModal').modal('show');
            },
            SiModal: function () {
                var DTO = {};
                var strUrl = "";
                var strMsj = "";

                DTO.co_cronogramaejecucion = this.IdCronogramaEjecucion;
                strUrl = "/CronogramaEjecucion/Del_CronogramaEjecucion";
                strMsj = "Se eliminó.";

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {
                        this.IdCronogramaEjecucion = '';
                        MensajeModal('Se elimino correctamente.', 0);
                        this.ListarTabla();
                    } else {
                        MensajeModal(response.data, 0);
                    }
                }).catch(error => {
                    console.log(error)
                    this.errored = true
                });
            },
            AbrirModalBusqueda: function () {
                $('#ModalBusqueda').modal('show');
            },
            ConvertirMiles: function (n) {
                n = n.toString()
                while (true) {
                    var n2 = n.replace(/(\d)(\d{3})($|,|\.)/g, '$1,$2$3')
                    if (n == n2) break
                    n = n2
                }
                return n
            }
        },
        created: function () {
            this.ListarEstadosCronograma();
            //this.ListarTipoDocumento();
        },
    });


    $("#tbPrincipal").on("click", "button.editar", function () {

        var table = $('#tbPrincipal').DataTable();
        var data = null;
        if (table.row(this).child.isShown()) {
            data = table.row(this).data();
        } else {
            data = table.row($(this).parents("tr")).data();
        }
        appCronogramaEjecucion.editar(data);
    });

    $("#tbPrincipal").on("click", "button.eliminar", function () {
        var table = $('#tbPrincipal').DataTable();
        if (table.row(this).child.isShown()) {
            var data = table.row(this).data();
        } else {
            var data = table.row($(this).parents("tr")).data();
        }
        appCronogramaEjecucion.eliminar(data);

    });

    EjecutarListar = function (data) {
        $('#txtProyecto').val(data["de_proyecto"]);
        $('#txtSRT').val(data["co_SRT"]);
        $('#txtMontoTotal').val(data["mo_total"]);
        $('#txtFechaIniProyecto').val(data["fe_inicio"]);
        $('#txtFechaFinProyecto').val(data["fe_fin"]);
        $("#txtEstadoProyecto").val(data["tx_valor3"]);

        appCronogramaEjecucion.IdProyecto = data["co_proyecto"];
        appCronogramaEjecucion.desProyeto = data["de_proyecto"];
        appCronogramaEjecucion.SimboloMoneda = data["sm_moneda"];
        appCronogramaEjecucion.IdMoneda = data["co_moneda"];

        appCronogramaEjecucion.ListarTablaCronogramaPago();
    }
    CancelarBusqueda = function () {
        $('#txtProyecto').val('');
        $('#txtSRT').val('');
        $('#txtMontoTotal').val('');
        $('#txtFechaIniProyecto').val('');
        $('#txtFechaFinProyecto').val('');
        $("#txtEstadoProyecto").val('');
        
        
        appCronogramaEjecucion.SaldoTotal = '';
        appCronogramaEjecucion.IdProyecto = '';
        appCronogramaEjecucion.desProyeto = '';
        appCronogramaEjecucion.SimboloMoneda = '';
        appCronogramaEjecucion.IdMoneda = '';

        appCronogramaEjecucion.clearDatatable('tbPrincipal');
        appCronogramaEjecucion.clearDatatable('tbCronogramaPago');
    }


    $('#txtFechaOrdenFacturacion').datepicker({
        todayHighlight: true,
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: "es",
    });


    $('#txtFechaFacturacion').datepicker({
        todayHighlight: true,
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: "es",
    });

    

});



