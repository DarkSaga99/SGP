
$(document).ready(function () {


    var app = new Vue({
        el: '#app',
        data: {
            dCliente: [],
            dTipoDocumento: [],
            dDistrito: [],
            dMoneda: [],
            dResponsable: [],
            dEstadoProyecto: [],
            IdProyecto: '',
            selectTipoDocumento: '',
            selectRecurso: '',
            NroDocumentoModal: '',
            DescripcionModal: '',
            DireccionModal: '',
            tituloModal: 'Nuevo Proyecto',
            txtNroDocumento: '',
            txtNombre: '',

        },
        methods: {
            ListarEstadosProyecto: function () {
                var data = {
                    co_tabla: 9,
                };
                axios.post('/TGeneral/CargaTGeneral', data).then(response => {
                    this.dEstadoProyecto = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListaTipoDocumento: function () {
                var data = {
                    co_tabla: 1
                };
                axios.post('/TGeneral/CargaTGeneral', data).then(response => {
                    this.dTipoDocumento = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarCliente: function () {
                var data = {
                    st_cliente: 1,
                };
                axios.post('/Cliente/CargaGrilla', data).then(response => {
                    this.dCliente = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarMoneda: function () {
                var data = {
                    st_moneda: 1
                };
                axios.post('/Moneda/Sel_Moneda', data).then(response => {
                    this.dMoneda = response.data;

                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarResponsable: function () {
                var data = {
                    st_responsable: 1,
                };
                axios.post('/Responsable/CargaGrilla', data).then(response => {
                    this.dResponsable = response.data;
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
                DTO.de_proyecto = $('#txtdescripcion').val();
                DTO.co_SRT = $('#txtSRTProyecto').val();

                DTO.co_SRT = $('#txtSRTProyecto').val();

                DTO.fe_inicio = $('#txtFechaInicio').val();
                DTO.fe_fin = $('#txtFechaFin').val();

                DTO.mo_total = parseFloat($('#txtMontoTotal').val().replace(',', ''));
                DTO.mo_avance = parseFloat($('#txtMontoAvance').val().replace(',', ''));
                DTO.mo_pendiente = parseFloat($('#txtMontoPendiente').val().replace(',', ''));
                DTO.mo_adicional = parseFloat($('#txtMontoAdicional').val().replace(',', ''));
                DTO.mo_presupuestado = parseFloat($('#txtMontoPresupuestado').val().replace(',', ''));

                DTO.co_moneda = $('#cboMonedaModal').val();
                DTO.co_cliente = $('#cboClienteModal').val();

                DTO.co_responsable = $('#cboResponsableModal').val();

                DTO.st_proyecto = $('#cboEstadoProyectoModal').val();
                //DTO.co_recurso = this.selectRecurso;


                if (this.IdProyecto == '') {
                    strUrl = "/Proyecto/Ins_Proyecto";
                    strMsj = "Se grabó correctamente.";
                }
                else {
                    DTO.co_proyecto = this.IdProyecto;
                    strUrl = "/Proyecto/Upd_Proyecto";
                    strMsj = "Se actualizó correctamente.";
                }

                var Datos = {};
                Datos.DTO = DTO;

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {
                        this.IdProyecto = '';
                        MensajeModal(strMsj, 0);
                        this.Listartabla();
                    } else {
                        MensajeModal(response.data, 2);
                    }
                }).catch(error => {
                    MensajeModal(error, 0);
                    console.log(error)
                    this.errored = true
                });
            },
            Buscar: function () {
                if (!ValidarElementos($('#btnBuscar').attr('id'))) {
                    this.Listartabla();
                }
            },
            Listartabla: function () {

                var Datos = {};
                Datos.de_proyecto = $('#txtDescripcionBusqueda').val();
                Datos.co_SRT = $('#txtSRTBusqueda').val();
                Datos.fe_inicio = $('#txtFechaInicioBusqueda').val();
                Datos.st_proyecto = $('#cboEstadoProyecto').val();
                Datos.ti_proyecto = $('#txtResponsable').val();
                

                var table = null;
                this.clearDatatable();

                axios.post('/Proyecto/CargaGrilla', Datos).then(response => {
                    var listData = response.data;
                    if (listData !== "[]") {
                        if ($.fn.dataTable.isDataTable('#tbTabla')) {
                            table = $('#tbTabla').DataTable();
                        }
                        else {
                            var item = 0;

                            table = $('#tbTabla').DataTable({
                                "searching": false,
                                "processing": true,
                                //"paging": false,
                                "pageLength": 10,
                                "ordering": false,
                                "info": listData.length < 7 ? false : true,
                                "data": listData,
                                "columns": [
                                { 'data': 'de_proyecto', 'width': '30%' },
                                { 'data': 'co_SRT', 'width': '10%' },
                                {
                                    'width': '15%',
                                    render: function (data, type, row, meta) {
                                        return '<h6> ' + row["sm_moneda"] + ' ' + app.ConvertirMiles(row["mo_total"]) + ' </h6>';
                                    }
                                },
                                { 'data': 'tx_valor1', 'width': '5%' },
                                { 'data': 'tx_valor2', 'width': '24%' },
                                { 'data': 'fe_inicio', 'width': '10%' },
                                { 'data': 'fe_fin', 'width': '10%' },
                                { 'data': 'tx_valor3', 'width': '10%' },
                                {
                                    'width': '2%',
                                    "render": function (data, type, row, meta) {
                                        var html = '';
                                        html += '<div class="row">';
                                        html += '<button type="button" id="ButtonResponsable" class="responsable edit-modal btn btn-success botonResponsable offset-2" ><span class="fas fa-users"></span></i></button>'
                                        html += '<span class="SpamCirculo" id="SPRecursos' + row["co_proyecto"] + '">' + row["cn_recursos"] + '</span>';
                                        html += '</div>';

                                        return html;
                                    }
                                },
                                {
                                    'width': '2%',
                                    "render": function () {
                                        return '<button type="button" id="ButtonEditar" class="editar edit-modal btn btn-warning botonEditar" ><span class="fas fa-pencil-alt"></span></button>';
                                    }
                                },
                                {
                                    'width': '2%',
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
                                    },
                                },
                                "buttons": [
                                    'copy',
                                    {
                                        extend: 'excel',
                                        messageTop: 'The information in this table is copyright to Sirius Cybernetics Corp.'
                                    },
                                    {
                                        extend: 'pdf',
                                        messageBottom: null
                                    },
                                    {
                                        extend: 'print',
                                        messageTop: function () {
                                            printCounter++;

                                            if (printCounter === 1) {
                                                return 'This is the first time you have printed this document.';
                                            }
                                            else {
                                                return 'You have printed this document ' + printCounter + ' times';
                                            }
                                        },
                                        messageBottom: null
                                    }
                                ]
                            });
                            //eliminar("#tbproyecto tbody", table);
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
                var clearTable = $('#tbTabla').DataTable();
                clearTable.clear();
                $('#tbTabla').empty();
                clearTable.destroy();
            },
            editar: function (data) {
                LimpiarFormularioModal($('#btnGuardarModal').attr('id'));

                this.tituloModal = 'Editar Proyecto';
                this.IdProyecto = data["co_proyecto"];
                //
                $('#txtdescripcion').val(data["de_proyecto"]);
                $('#txtSRTProyecto').val(data["co_SRT"]);

                $('#txtSRTProyecto').val(data["co_SRT"]);

                $('#txtFechaInicio').val(data["fe_inicio"]);
                $('#txtFechaFin').val(data["fe_fin"]);

                $('#txtMontoTotal').val(data["mo_total"]);
                $('#txtMontoAvance').val(data["mo_avance"]);
                $('#txtMontoPendiente').val(data["mo_pendiente"]);
                $('#txtMontoAdicional').val(data["mo_adicional"]);
                $('#txtMontoPresupuestado').val(data["mo_presupuestado"]);

                $('#cboMonedaModal').val(data["co_moneda"]);
                $('#cboClienteModal').val(data["co_cliente"]);

                $('#cboEstadoProyectoModal').val(data["st_proyecto"]);

                $('#cboResponsableModal').val(data["co_responsable"]);
                //

                $('#exampleModalCenter').modal('show');

            },
            nuevo: function () {

                LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
                this.LimpiarSelect();
                $('#cboMonedaModal').val('1');
                $('#cboEstadoProyectoModal').val('1');
                $('#exampleModalCenter').modal('show');
                $('#txtdescripcion').first().focus();
                this.IdProyecto = '';

            },
            Salir: function () {
                $('#exampleModalCenter').modal('hide');
            },
            eliminar: function (data) {
                this.IdProyecto = data["co_proyecto"];
                $('#eliminarModal').modal('show');
            },
            SiModal: function () {
                var DTO = {};
                let strUrl = "";
                let strMsj = "";

                DTO.co_proyecto = this.IdProyecto;
                strUrl = "/Proyecto/Del_Proyecto";
                strMsj = "Se eliminó.";

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {
                        this.IdProyecto = '';
                        MensajeModal(strMsj, 0);
                        this.Listartabla();
                    } else {
                        MensajeModal(response.data, 2)
                    }
                }).catch(error => {
                    console.log(error)
                    this.errored = true
                });
            },
            LimpiarSelect: function () {
                this.selectedCargo = '',
                this.selectedDocumento = 0;
                this.selectTipoDocumento = '';
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
            ListarResponsableBusqueda: function () {
                $('#appBuscadorResponsable .BuscadorResponsable').modal('show');
            },
        },
        created: function () {
            this.ListarEstadosProyecto();
            this.ListarCliente();
            this.ListarMoneda();
            this.ListarResponsable();
            this.Listartabla();
        },
    });


    var appFormulario = new Vue({
        el: '#appToast',
        data: {
            ListaToast: [],
            CssShow: '',
        },
        methods: {
            mostrarmensaje: function () {
                alert('Llamar otro Vue');
            },
        }
    });

    $("#tbTabla").on("click", "button.editar", function () {
        limpiarModal();
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

    $("#tbTabla").on("click", "button.responsable", function () {
        $('#ModalProyectoRecurso').modal('show');
        //$('#ModalProyectoRecurso').modal('draggable');
        //draggable: true
        //var modalDiv = $('#myModal');
        //modalDiv.modal({ backdrop: false, show: true });
        var table = $('#tbTabla').DataTable();
        var data = table.row($(this).parents("tr")).data();
        GenerarProyectoRecurso(data["co_proyecto"]);
        
    });


    var limpiarModal = function () {
        $('#hidIdCliente').val("");
        $('#txtNroDocumentoModal').val("");
        $('#txtNombreModal').val("");
        $('#txtDireccionModal').val("");
        $("#rbnActivo").prop("checked", true);
    }



    $('#txtFechaInicio').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: "es",
    }).on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $('#txtFechaFin').datepicker('setStartDate', minDate);
    });

    $('#txtFechaFin').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: "es",
    });


    $('#txtFechaInicioBusqueda').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: "es",
        setDate: new Date(),
    }).on('hide', function (selected) {
        app.Listartabla();
    });

    EjecutarListar = function (data) {
        $('#txtResponsable').val(data["NombreCompleto"]);
    };
    CancelarBusqueda = function () {
        $('#txtResponsable').val('');
    }

});