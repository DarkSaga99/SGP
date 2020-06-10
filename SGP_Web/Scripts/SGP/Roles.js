$(document).ready(function () {

    var id = "";
    $('#btnNuevo').on('click', function () {
        $('#idCrear').val("");
        $('#Name').val("");
        $('#CrearModal').modal('show');
    });

    $('#tbTabla .btnEliminar').on('click', function () {
        id = $(this).attr('data-id')
        $('#idRol').val(id);
        
        $('#eliminarModal').modal('show');
    });

    $('#tbTabla .btnEditar').on('click', function () {
        var data = $(this).parent();
        $(data).parent("tr").each(function () {
            var data = $(this).children();
            var Nombre = $(data[0]).text().trim();
            var id = $(data[1]).children().val();
            $('#idCrear').val(id);
            $('#NameEdit').val(Nombre);
            $('#EditarModal').modal('show');
        });
    });

    //$('.btnSiModal').on('click', function () {
    //    debugger;
    //    var DTO = {};
    //    DTO.Id = id;


    //    $.ajax({
    //        type: "POST",
    //        url: "/Role/Delete",
    //        data: JSON.stringify(DTO),
    //        dataType: "json",
    //        contentType: "application/json; charset=utf-8",
    //        async: true,
    //        success: function (data) {
    //        },
    //        error: function (data) {
    //            console.log('Error')
    //            console.log(data);
    //        }
    //    });
    //    $('#eliminarModal').modal('hide');
    //    location.reload();
    //});


});



