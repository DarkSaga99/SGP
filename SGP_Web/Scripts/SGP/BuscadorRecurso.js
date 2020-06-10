var appBuscadorRecurso = new Vue({
    el: '#appBuscadorRecurso',
    data: {
    },
    methods: {
        AbrirModal: function () {
            $('#ModalBusqueda').modal('show');
        },
        Listar: function () {
            var Datos = {
            };
            Datos.de_recurso = $('#txtBusquedaRecurso').val();
            var table = null;
            var clearTable = $('#tbRecursos').DataTable();
            clearTable.clear();
            $('#tbRecursos').empty();
            clearTable.destroy();

            axios.post('/Recurso/CargaGrilla', Datos).then(response => {
                var listData = response.data;
                if (listData !== "[]") {
                    if ($.fn.dataTable.isDataTable('#tbRecursos')) {
                        table = $('#tbRecursos').DataTable();
                    }
                    else {
                        var item = 0;
                        table = $('#tbRecursos').DataTable({
                            "searching": false,
                            "processing": true,
                            "iDisplayLength": 6,
                            "paging": true,
                            "ordering": false,
                            "info": listData.length < 7 ? false : true,
                            "data": listData,
                            "columns": [
                            { 'data': 'de_recurso', 'width': '60%' },
                            { 'data': 'de_tabla', 'width': '10%' },
                            { 'data': 'nu_documento', 'width': '10%' },
                            { 'data': 'de_area', 'width': '10%' },
                            { 'data': 'fe_ingreso', 'width': '10%' },
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
                        $('#tbRecursos tbody').on('click', 'tr', function () {
                            var table = $('#tbRecursos').DataTable();
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
        this.Listar();
    },
});