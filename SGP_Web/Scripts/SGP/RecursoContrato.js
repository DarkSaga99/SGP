$(document).ready(function () {

    var app = new Vue({
        el: '#app',
        data: {
            tituloModal: '',
            dMoneda: [],
            dRecurso: [],
            dEstadoContrato: [],
            dTipoContrato: [],
            idRecurso: 0,
            idRecursoContrato: 0,
        },
        methods: {
            ListaEstadoContrato: function () {
                var data = {
                    co_tabla: 15,
                };
                axios.post('/TGeneral/CargaTGeneral', data).then(response => {
                    this.dEstadoContrato = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListaTipoContrato: function () {
                var data = {
                    co_tabla: 16,
                };
                axios.post('/TGeneral/CargaTGeneral', data).then(response => {
                    this.dTipoContrato = response.data;
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
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarRecurso: function () {
                var data = {
                };
                axios.post('/Recurso/CargaGrilla', data).then(response => {
                    this.dRecurso = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarTabla: function () {

                var Datos = {};
                Datos.CodigoRecurso = $('#cboRecurso').val();
                Datos.FechaInicioContrato = $('#txtFechaInicioContrato').val();
                Datos.FechaFinContrato = $('#txtFechaFinContrato').val();

                var table = null;
                this.clearDatatable();

                axios.post('/RecursoContrato/CargaGrilla', Datos).then(response => {
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
                                { 'data': 'FechaInicioContrato', 'width': '10%' },
                                { 'data': 'FechaFinContrato', 'width': '10%' },
                                { 'data': 'de_recurso', 'width': '30%' },
                                {
                                    'width': '10%',
                                    "render": function (data, type, row, meta) {
                                        return '<h6> ' + row["sm_moneda"] + ' ' + app.ConvertirMiles(row["ImporteContrato"]) + ' </h6>';
                                    }
                                },
                                { 'data': 'de_TipoContrato', 'width': '10%' },
                                { 'data': 'de_EstadoContrato', 'width': '10%' },
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
            ListarRecursos: function () {
                $('#ModalBusqueda').modal('show');
                $('#exampleModalCenter').modal('hide');
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
                DTO.CodigoRecurso = this.idRecurso;
                DTO.FechaInicioContrato = $('#txtFechaInicioContratoModal').val();
                DTO.FechaFinContrato = $('#txtFechaFinContratoModal').val();
                DTO.CodigoMoneda = $('#cboMonedaModal').val();
                DTO.ImporteContrato = $('#txtImporteContrato').val().replace(/,/g, '');
                DTO.TipoContrato = $('#cboTipoContrato').val();
                DTO.EstadoContrato = $('#cboEstadoContrato').val();
                DTO.Sustento = $('#txtSustento').val();

                if (this.idRecursoContrato == '') {
                    strUrl = "/RecursoContrato/Ins_RecursoContrato";
                    strMsj = "Se grabó correctamente.";
                }
                else {
                    DTO.CodigoRecursoContrato = this.idRecursoContrato;
                    strUrl = "/RecursoContrato/Upd_RecursoContrato";
                    strMsj = "Se actualizó correctamente.";
                }

                var Datos = {};
                Datos.DTO = DTO;

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {
                        this.idRecursoContrato = '';
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
                
                this.tituloModal = 'Editar Contrato';
                //
                $('#exampleModalCenter').modal('show');

                this.idRecursoContrato = data["CodigoRecursoContrato"];
                this.idRecurso = data["CodigoRecurso"];
                $('#txtRecurso').val(data["de_recurso"]);
                $('#txtFechaInicioContratoModal').val(data["FechaInicioContrato"]);
                $('#txtFechaFinContratoModal').val(data["FechaFinContrato"]);
                $('#cboMonedaModal').val(data["CodigoMoneda"]);
                $('#txtImporteContrato').val(data["ImporteContrato"]);
                $('#cboTipoContrato').val(data["TipoContrato"]);
                $('#cboEstadoContrato').val(data["EstadoContrato"]);
                $('#txtSustento').val(data["Sustento"]);
                //

                

            },
            nuevo: function () {
                LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
                $('#exampleModalCenter').modal('show');
            },
            eliminar: function (data) {

                this.idRecursoContrato = data["CodigoRecursoContrato"];
                $('#eliminarModal').modal('show');
            },
            SiModal: function () {
                var DTO = {};
                let strUrl = "";
                let strMsj = "";

                DTO.CodigoRecursoContrato = this.idRecursoContrato;
                strUrl = "/RecursoContrato/Del_RecursoContrato";
                strMsj = "Se eliminó.";

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {
                        this.idRecursoContrato = '';
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
            }
        },
        created: function () {
            this.ListarTabla();
            this.ListarRecurso();
            this.ListarMoneda();
            this.ListaEstadoContrato();
            this.ListaTipoContrato();
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
        app.idRecurso = data["co_recurso"];
        $('#txtRecurso').val(data["de_recurso"]);
        ValidarElementos($('#btnGuardarModal').attr('id'))
        $('#ModalBusqueda').modal('hide');
        $('#exampleModalCenter').modal('show');
    };

    $('#txtFechaInicioContrato').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: "es",
    }).on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $('#txtFechaFinContrato').datepicker('setStartDate', minDate);
    });

    $('#txtFechaFinContrato').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: "es",
    });

    $('#txtFechaInicioContratoModal').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: "es",
    }).on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $('#txtFechaFinContratoModal').datepicker('setStartDate', minDate);
    });

    $('#txtFechaFinContratoModal').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: "es",
    });

});



