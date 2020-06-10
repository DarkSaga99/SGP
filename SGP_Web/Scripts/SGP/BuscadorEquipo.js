var appBuscadorEquipo = new Vue({
    el: '#appBuscadorEquipo',
    data: {
    },
    methods: {
        ListarEquipo: function () {
            var Datos = {};
            Datos.DescripcionEquipo = $('#txtBusquedaEquipo').val();

            var table = null;
            var clearTable = $('#tbEquipo').DataTable();
            clearTable.clear();
            $('#tbEquipo').empty();
            clearTable.destroy();

            axios.post('/Equipo/CargaGrilla', Datos).then(response => {
                var listData = response.data;
                if (listData !== "[]") {
                    if ($.fn.dataTable.isDataTable('#tbEquipo')) {
                        table = $('#tbEquipo').DataTable();
                    }
                    else {
                        var item = 0;
                        table = $('#tbEquipo').DataTable({
                            "searching": false,
                            "processing": true,
                            "iDisplayLength": 6,
                            "paging": true,
                            "ordering": false,
                            "info": listData.length < 7 ? false : true,
                            "data": listData,
                            "columns": [
                            { 'data': 'DescripcionEquipo', 'width': '30%' },
                            { 'data': 'de_TipoEquipo', 'width': '10%' },
                            { 'data': 'de_recurso', 'width': '40%' },
                            { 'data': 'de_EstadoEquipo', 'width': '10%' },
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
                        $('#tbEquipo tbody').on('click', 'tr', function () {
                            var table = $('#tbEquipo').DataTable();
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
        this.ListarEquipo();
    },
});