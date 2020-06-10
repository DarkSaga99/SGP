$(document).ready(function () {

    var app = new Vue({
        el: '#app',
        data: {
            tituloModal: '',
            dRecurso: [],
            dMoneda: [],
            dEstadoEquipo: [],
            dTipoEquipo: [],
            CodigoEquipo: 0,
            RecursoAsociado : 0,

        },
        methods: {
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
            ListaEstadoEquipo: function () {
                var data = {
                    co_tabla: 17,
                };
                axios.post('/TGeneral/CargaTGeneral', data).then(response => {
                    this.dEstadoEquipo = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListaTipoEquipo: function () {
                var data = {
                    co_tabla: 18,
                };
                axios.post('/TGeneral/CargaTGeneral', data).then(response => {
                    this.dTipoEquipo = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarTabla: function () {

                var Datos = {};
                Datos.DescripcionEquipo = $('#txtEquipo').val();
                Datos.FechaInicioEquipo = $('#txtFecha').val();
                Datos.TipoEquipo = $('#cboTipoEquipo').val();
                Datos.CodigoRecursoAsociado = $('#cboRecurso').val();

                var table = null;
                this.clearDatatable();

                axios.post('/Equipo/CargaGrilla', Datos).then(response => {
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
                                { 'data': 'DescripcionEquipo', 'width': '10%' },
                                { 'data': 'de_TipoEquipo', 'width': '10%' },
                                {
                                    'width': '10%',
                                    "render": function (data, type, row, meta) {
                                        return '<h6> ' + row["sm_moneda"] + ' ' + app.ConvertirMiles(row["TarifaEquipo"]) + ' </h6>';
                                    }
                                },
                                { 'data': 'de_recurso', 'width': '10%' },
                                { 'data': 'FechaInicioEquipo', 'width': '10%' },
                                { 'data': 'FechaFinEquipo', 'width': '10%' },
                                { 'data': 'de_EstadoEquipo', 'width': '10%' },                                
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
            clearDatatable: function () {
                var clearTable = $('#tbTabla').DataTable();
                clearTable.clear();
                $('#tbTabla').empty();
                clearTable.destroy();
            },
            ListarRecursos: function () {
                $('#txtBusqueda').val('');
                $('#ModalBusqueda').modal('show');
                $('#exampleModalCenter').modal('hide');
            },
            Guardar: function () {
                if (ValidarElementos($('#btnGuardarModal').attr('id'))) {
                    return;
                }
                var DTO = {};
                var strUrl = "";
                var strMsj = "";
                DTO.DescripcionEquipo = $('#txtDescripcion').val();
                DTO.TipoEquipo = $('#cboTipoEquipoModal').val();
                DTO.CodigoMoneda = $('#cboMonedaModal').val();
                DTO.TarifaEquipo = $('#txtTarifaEquipo').val().replace(/,/g, '');
                DTO.CodigoRecursoAsociado = this.RecursoAsociado;
                DTO.EstadoEquipo = $('#cboEstadoEquipoModal').val();
                DTO.FechaInicioEquipo = $('#txtFechaInicioModal').val();
                DTO.FechaFinEquipo = $('#txtFechaFinModal').val();
                DTO.Observacion = $('#txtObservacion').val();

                if (this.CodigoEquipo == '') {
                    strUrl = "/Equipo/Ins_Equipo";
                    strMsj = "Se grabó correctamente.";
                }
                else {
                    DTO.CodigoEquipo = this.CodigoEquipo;
                    strUrl = "/Equipo/Upd_Equipo";
                    strMsj = "Se actualizó correctamente.";
                }

                var Datos = {};
                Datos.DTO = DTO;

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {
                        this.CodigoEquipo = '';
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

                this.tituloModal = 'Editar Equipo';
                //
                this.CodigoEquipo = data["CodigoEquipo"];
                $('#txtDescripcion').val(data["DescripcionEquipo"]);
                $('#cboTipoEquipoModal').val(data["TipoEquipo"]);
                $('#cboMonedaModal').val(data["CodigoMoneda"]);
                $('#txtTarifaEquipo').val(data["TarifaEquipo"]);
                this.RecursoAsociado = data['CodigoRecursoAsociado'];
                $('#txtRecurso').val(data['de_recurso']);
                $('#cboEstadoEquipoModal').val(data["EstadoEquipo"]);
                $('#txtFechaInicioModal').val(data["FechaInicioEquipo"]);
                $('#txtFechaFinModal').val(data["FechaFinEquipo"]);
                $('#txtObservacion').val(data["Observacion"]);
                //

                $('#exampleModalCenter').modal('show');

            },
            nuevo: function () {
                LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
                //var date = new Date();
                //var yyyy = date.getFullYear().toString();
                //var mm = (date.getMonth() + 1).toString();
                //var dd = date.getDate().toString();
                //$('#txtFechaModal').val((dd[1] ? dd : "0" + dd[0]) + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + yyyy);
                this.tituloModal = 'Nuevo Equipo';
                $('#exampleModalCenter').modal('show');
            },
            eliminar: function (data) {
                this.CodigoEquipo = data["CodigoEquipo"];
                $('#eliminarModal').modal('show');
            },
            SiModal: function () {
                var DTO = {};
                let strUrl = "";
                let strMsj = "";

                DTO.CodigoEquipo = this.CodigoEquipo;
                strUrl = "/Equipo/Del_Equipo";
                strMsj = "Se eliminó.";

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {
                        this.CodigoEquipo = '';
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
            this.ListarMoneda();
            this.ListarRecurso();
            this.ListaEstadoEquipo();
            this.ListaTipoEquipo();

            this.ListarTabla();
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
        app.RecursoAsociado = data["co_recurso"];
        $('#txtRecurso').val(data["de_recurso"]);
        //ValidarElementos($('#btnGuardarModal').attr('id'))
        $('#ModalBusqueda').modal('hide');
        $('#exampleModalCenter').modal('show');
    };


    $('#txtFecha').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: "es",
    });


    $('#txtFechaInicioModal').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: "es",
    }).on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $('#txtFechaFinModal').datepicker('setStartDate', minDate);
    });

    $('#txtFechaFinModal').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: "es",
    });

});



