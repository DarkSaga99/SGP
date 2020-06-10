$(document).ready(function () {


    var appCronogramaPagos = new Vue({
        el: '#appCronogramaPagos',
        data: {
            dEstadoCronograma: [],
            IdCronogramaPago: '',
            selectEstadoCronograma: 0,
            tituloModal: 'Nuevo Cronograma Pago',
            IdProyecto: '',
            desProyeto: '',
            SimboloMoneda: '',
            CPMontoAnterior: 0,
            CPPosicion: 0,
            ImporteTotal: 0,
            SaldoTotal: '',
        },
        methods: {
            ListarEstadosCronograma: function () {
                var data = {
                    co_tabla: 10,
                };
                axios.post('/TGeneral/CargaTGeneral', data).then(response => {
                    this.dEstadoCronograma = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            Guardar: function () {

                if (ValidarElementos($('#btnGuardarModal').attr('id'))) {
                    return;
                }

                var DTO = {};
                var strUrl = "";
                var strMsj = "";

                var table = $('#tbPrincipal').DataTable();
                var sum_montoCP = 0;
                var nroCuota = $("#txtCuota").val();
                var contador_cuota = 0;
                var max_Cuota = 0;
                var _CPPosicion = this.CPPosicion
                table.column(5).data().each(function (value, index) {
                    sum_montoCP += value;
                });
                table.column(2).data().each(function (value, index) {
                    if (nroCuota == value && nroCuota != _CPPosicion) {
                        contador_cuota++;
                    }
                    if (max_Cuota < value) {
                        max_Cuota = value;
                    }
                });

                if (parseFloat($('#txtMontoTotal').val().replace(',', '')) < sum_montoCP + parseFloat($("#txtImporte").val().replace(',', '') - this.CPMontoAnterior)) {
                    MensajeModal("El importe que desea registrar supera al saldo del proyecto.", 2);
                    return;
                }
                if (contador_cuota > 0) {
                    MensajeModal("El número de cuota ingresada ya existe, por favor ingrese otra donde la ultima cuota es " + max_Cuota + ".", 2);
                    return;
                }


                DTO.co_proyecto = this.IdProyecto;
                DTO.fe_programada = $("#txtFechaProgramada").val();
                DTO.mo_importe = parseFloat($("#txtImporte").val().replace(',', ''));
                DTO.nu_hito = $("#txtCuota").val();
                DTO.de_hito = $("#txtDescripcionHito").val();
                DTO.ob_cronograma = $("#txtObservacionCronograma").val();
                DTO.fe_pago = $("#txtFechaPago").val();
                DTO.nu_oc = $("#txtOrdenCompra").val();
                DTO.nu_recepcion = $("#txtNroRecepcion").val();
                DTO.so_interna = $("#txtSolicitudInterna").val();
                DTO.st_cronograma = $("#cboEstadoCronograma").val();


                if (this.IdCronogramaPago == '') {
                    strUrl = "/CronogramaPago/Ins_CronogramaPago";
                    strMsj = "Se grabó correctamente.";
                }
                else {
                    DTO.id_cronograma = this.IdCronogramaPago;
                    strUrl = "/CronogramaPago/Upd_CronogramaPago";
                    strMsj = "Se actualizó correctamente.";
                }

                var Datos = {};
                Datos.DTO = DTO;

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {
                        this.IdCronogramaPago = '';
                        MensajeModal(strMsj, 0);
                        this.ListarTabla();
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
                this.clearDatatable();

                axios.post('/CronogramaPago/CargaGrilla', Datos).then(response => {
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
                                "ordering": false,
                                "info": listData.length < 7 ? false : true,
                                "data": listData,
                                "columns": [
                                { 'data': 'id_cronograma', 'className': 'hiddeColumn', 'width': '0%' },
                                { 'data': 'co_proyecto', 'className': 'hiddeColumn', 'width': '0%' },
                                { 'data': 'nu_hito', 'width': '5%' },
                                { 'data': 'de_hito', 'width': '30%' },
                                { 'data': 'fe_programada', 'width': '10%' },
                                { 'data': 'mo_importe', 'className': 'hiddeColumn' },
                                {
                                    'data': 'tx_valor1', 'width': '10%',
                                    "render": function (data, type, row, meta) {
                                        return '<h6> ' + row["tx_valor1"] + ' ' + appCronogramaPagos.ConvertirMiles(row["mo_importe"]) + ' </h6>';
                                    }
                                },
                                { 'data': 'ob_cronograma', 'className': 'hiddeColumn', 'width': '0%' },
                                { 'data': 'fe_pago', 'className': 'hiddeColumn', 'width': '0%' },
                                { 'data': 'nu_oc', 'width': '10%' },
                                { 'data': 'nu_recepcion', 'width': '10%' },
                                { 'data': 'so_interna', 'width': '10%' },
                                { 'data': 'st_cronograma', 'className': 'hiddeColumn', 'width': '0%' },
                                { 'data': 'tx_valor3', 'width': '5%' },
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
                            });

                            table.column(5).data().each(function (value, index) {
                                sum_montoCP += value;
                            });
                            $("#txtImporteTotal").text(_SimboloMoneda + " " + this.ConvertirMiles(sum_montoCP));
                            sum_montoCP = this.ConvertirMiles(parseFloat($('#txtMontoTotal').val().replace(',', '') - sum_montoCP));
                            appCronogramaPagos.SaldoTotal = sum_montoCP;
                        }

                    } else {
                        this.clearDatatable();
                    }

                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });

            },
            clearDatatable: function () {
                var clearTable = $('#tbPrincipal').DataTable();
                clearTable.clear();
                $('#tbPrincipal').empty();
                clearTable.destroy();
            },
            editar: function (data) {
                LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
                $("#txtFechaProgramada").val(data["fe_programada"]);
                $("#txtImporte").val(data["mo_importe"]);
                this.CPMontoAnterior = data["mo_importe"];
                this.CPPosicion = data["nu_hito"];
                $("#txtCuota").val(data["nu_hito"]);
                $("#txtDescripcionHito").val(data["de_hito"]);
                $("#txtObservacionCronograma").val(data["ob_cronograma"]);
                $("#txtFechaPago").val(data["fe_pago"]);
                $("#txtOrdenCompra").val(data["nu_oc"]);
                $("#txtNroRecepcion").val(data["nu_recepcion"]);
                $("#txtSolicitudInterna").val(data["so_interna"]);
                $("#cboEstadoCronograma").val(data["st_cronograma"]);
                this.IdCronogramaPago = data["id_cronograma"];

                $("#txtFechaProgramada").val(data["fe_programada"]);
                $('#exampleModalCenter').modal('show');
                $("#txtNroDocumentoModal").first().focus();
            },
            nuevo: function () {
                if (this.IdProyecto == '') {
                    Mensaje('Seleccione un proyecto', 2);
                    return;
                }
                LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
                $('#exampleModalCenter').modal('show');
                $('#cboEstadoCronograma').val(1);
                this.CPMontoAnterior = 0;
                this.CPPosicion = 0;
                this.IdCronogramaPago = '';
            },
            Salir: function () {
                $('#exampleModalCenter').modal('hide');
            },
            eliminar: function (data) {

                this.IdCronogramaPago = data["id_cronograma"];
                $('#eliminarModal').modal('show');
            },
            SiModal: function () {
                var DTO = {};
                let strUrl = "";
                let strMsj = "";

                DTO.id_cronograma = this.IdCronogramaPago;
                strUrl = "/CronogramaPago/Del_CronogramaPago";
                strMsj = "Se eliminó.";

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {
                        this.IdCronogramaPago = '';
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
            //this.ListarProyecto();
        },
    });


    $("#tbPrincipal").on("click", "button.editar", function () {
        limpiarModal();
        var table = $('#tbPrincipal').DataTable();
        var data = null;
        if (table.row(this).child.isShown()) {
            data = table.row(this).data();
        } else {
            data = table.row($(this).parents("tr")).data();
        }
        appCronogramaPagos.editar(data);
    });

    $("#tbPrincipal").on("click", "button.eliminar", function () {
        var table = $('#tbPrincipal').DataTable();
        if (table.row(this).child.isShown()) {
            var data = table.row(this).data();
        } else {
            var data = table.row($(this).parents("tr")).data();
        }
        appCronogramaPagos.eliminar(data);

    });

    EjecutarListar = function (data) {

        $('#txtProyecto').val(data["de_proyecto"]);
        $('#txtSRT').val(data["co_SRT"]);
        $('#txtMontoTotal').val(data["mo_total"]);
        $('#txtFechaIniProyecto').val(data["fe_inicio"]);
        $('#txtFechaFinProyecto').val(data["fe_fin"]);
        $("#txtEstadoProyecto").val(data["tx_valor3"]);

        appCronogramaPagos.IdProyecto = data["co_proyecto"];
        appCronogramaPagos.desProyeto = data["de_proyecto"];
        appCronogramaPagos.SimboloMoneda = data["sm_moneda"];
        appCronogramaPagos.ListarTabla();
    }
    CancelarBusqueda = function () {
        $('#txtProyecto').val('');
        $('#txtSRT').val('');
        $('#txtMontoTotal').val('');
        $('#txtFechaIniProyecto').val('');
        $('#txtFechaFinProyecto').val('');
        $("#txtEstadoProyecto").val('');
        
        appCronogramaPagos.SaldoTotal = '';
        appCronogramaPagos.IdProyecto = '';
        appCronogramaPagos.desProyeto = '';
        appCronogramaPagos.SimboloMoneda = '';
        appCronogramaPagos.clearDatatable();
    }

    var limpiarModal = function () {
        $('#hidIdCronogramaPago').val("");
        $('#txtNroDocumentoModal').val("");
        $('#txtNombreModal').val("");
        $('#txtDireccionModal').val("");
        $("#rbnActivo").prop("checked", true);
    }

    $('#txtFechaProgramada').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: "es",
        todayHighlight: true,
    });

    $('#txtFechaPago').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: "es",
        todayHighlight: true,
    });

});



