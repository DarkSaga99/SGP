var appBuscadorResponsable = new Vue({
        el: '#appBuscadorResponsable',
        data: {
        },
        methods: {
            Listar: function () {
                var Datos = {
                };
                Datos.no_responsable = $('#txtBusqueda').val();
                var table = null;
                var clearTable = $('#tbResponsable').DataTable();
                clearTable.clear();
                $('#tbResponsable').empty();
                clearTable.destroy();

                axios.post('/Responsable/CargaGrilla', Datos).then(response => {
                    var listData = response.data;
                    if (listData !== "[]") {
                        if ($.fn.dataTable.isDataTable('#tbResponsable')) {
                            table = $('#tbResponsable').DataTable();
                        }
                        else {
                            var item = 0;
                            table = $('#tbResponsable').DataTable({
                                "searching": false,
                                "processing": true,
                                "iDisplayLength": 6,
                                "paging": true,
                                "ordering": false,
                                "info": listData.length < 7 ? false : true,
                                "data": listData,
                                "columns": [
                                { 'data': 'NombreCompleto', 'width': '40%' },
                                { 'data': 'tx_valor1', 'width': '10%' },
                                { 'data': 'nu_documento', 'width': '20%' },
                                { 'data': 'de_padre', 'width': '30%' },
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
                            $('#tbResponsable tbody').on('click', 'tr', function () {
                                var table = $('#tbResponsable').DataTable();
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