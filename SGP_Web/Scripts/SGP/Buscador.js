$(document).ready(function () {

    var appBuscador = new Vue({
        el: '#appBuscador',
        data: {
            dProyecto: [],
            IdProyecto: '',
        },
        methods: {
            AbrirModal: function () {
                $('#ModalBusqueda').modal('show');
            },
            ListarProyecto: function () {

                var Datos = {
                    
                };
                Datos.de_proyecto = $('#txtProyectoBusqueda').val();

                var table = null;
                var clearTable = $('#tbProyecto').DataTable();
                clearTable.clear();
                $('#tbProyecto').empty();
                clearTable.destroy();

                axios.post('/Proyecto/CargaGrilla', Datos).then(response => {
                    var listData = response.data;
                    if (listData !== "[]") {
                        if ($.fn.dataTable.isDataTable('#tbProyecto')) {
                            table = $('#tbProyecto').DataTable();
                        }
                        else {
                            var item = 0;
                            table = $('#tbProyecto').DataTable({
                                "searching": false,
                                "processing": true,
                                "iDisplayLength": 6,
                                "paging": true,
                                "ordering": false,
                                "info": listData.length < 7 ? false : true,
                                "data": listData,
                                "columns": [
                                { 'data': 'co_proyecto', 'className': 'd-none', 'width': '0%' },
                                { 'data': 'de_proyecto', 'width': '30%' },
                                { 'data': 'co_SRT', 'width': '10%' },
                                { 'data': 'mo_total', 'width': '5%', render: $.fn.dataTable.render.number(',', '.', 2, '') },
                                { 'data': 'tx_valor3', 'width': '10%' },
                                { 'data': 'tx_valor1', 'width': '25%' },
                                { 'data': 'sm_moneda', 'className': 'd-none', 'width': '0%' },
                                { 'data': 'co_moneda', 'className': 'd-none', 'width': '0%' },
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
                            $('#tbProyecto tbody').on('click', 'tr', function () {
                                var table = $('#tbProyecto').DataTable();
                                var data = table.row(this).data();
                                $('#ModalBusqueda').modal('hide');
                                EjecutarListar(data);
                            });
                        }

                    } else {
                        this.clearDatatable();
                    }


                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });

            },
            CerrarModalBusqueda: function () {
                CancelarBusqueda();
            },
        },
        created: function () {
            this.ListarProyecto();
        },
    });

});



