$(document).ready(function() {
    var token = Cookies.get('token');
    var app = Cookies.get('app');
    if (app) { 
        if (app == '2') {
            Cookies.set('app', '2', {expires: 1});
            $('#app').load('welcome.php');
            $.ajax({
                type: "GET",
                url: 'http://127.0.0.1:8000/api/talk/welcome',
                success: function(data) {
                    var html = "";
                    $.each(data, function(index, item) {
                    html += 
                    "<tr>" + 
                        "<td>" + item.id + "</td>" + 
                        "<td>" + item.message + "</td>" + 
                        "<td>" + item.type + "</td>" + 
                        "<td>" + 
                        "<a style='color: inherit' target='_blank' href='http://127.0.0.1:8000/api/talk/welcome/delete/" + item.id + "'>" +
                            "<i class='fa fa-trash pointer'></i>" + 
                        "</a>" + 
                        // "<i class='fa fa-edit pointer'></i>" + 
                        "</td>" + 
                    "</tr>";
                    });
                    $('#items').html(html);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + " - " + errorThrown);
                }
            });
        }
        else if (app == '3') {
            $('#app').load('greeting.php');
            $.ajax({
                type: "GET",
                url: 'http://127.0.0.1:8000/api/talk/greeting',
                success: function(data) {
                    var html = "";
                    $.each(data, function(index, item) {
                    html += 
                    "<tr>" + 
                        "<td>" + item.id + "</td>" + 
                        "<td>" + item.message + "</td>" + 
                        "<td>" + item.type + "</td>" + 
                        "<td>" + 
                        "<a style='color: inherit' target='_blank' href='http://127.0.0.1:8000/api/talk/greeting/delete/" + item.id + "'>" +
                            "<i class='fa fa-trash pointer'></i>" + 
                        "</a>" + 
                        // "<i class='fa fa-edit pointer'></i>" + 
                        "</td>" + 
                    "</tr>";
                    });
                    $('#items').html(html);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + " - " + errorThrown);
                }
            });
        }
        else if (app == '4') {
            $('#app').load('../group.php');
            var c = Cookies.get('group');

            $.ajax({
                type: "GET",
                url: 'http://127.0.0.1:8000/api/group/' + c,
                success: function(data) {
                    var html = "";
                    $.each(data, function(index, item) {
                      $('#questions').append("<tr><td>" + item.id + "</td><td>" + item.group_id + "</td><td>" + item.course + "</td><td>" + item.question + "</td><td><a style='color: inherit' target='_blank' href='http://127.0.0.1:8000/api/question/delete/" + item.id + "'><i class='fa fa-trash pointer'></i></a><i class='fa fa-edit pointer edits-"+ item.id + "' data-toggle='modal' data-target='#mdlEditQuestion'></i></td></tr>");

                        $('.edits-' + item.id).on("click", function(event) {
                            $.ajax({
                                type: "GET",
                                url: 'http://127.0.0.1:8000/api/question/' + item.id,
                                success: function(data) {
                                    $('#editQuestion').val(data.question);
                                    $('#editCourse').val(data.course);
                                    $('#id').val(data.id);
                                },
                                error: function(jqXHR, textStatus, errorThrown) {
                                    console.log(textStatus + " - " + errorThrown);
                                }
                            });
                        });
                    });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + " - " + errorThrown);
                }
            });
        }
    }
    

    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:8000/api/chat/course',
        success: function(data) {
            $('.question-group').append('<a class="collapse-item pointer add-department custom-collapse-item" data-toggle="modal" data-target="#mdlDepartment">Add Department</a>');
            $.each(data, function(index, value) {
                $('.question-group').append('<a class="collapse-item group-departments pointer custom-collapse-item" data-group="' + value.name + '" data-endpoint="http://127.0.0.1:8000/api/group/delete/' + value.name + '" data-id="' + value.id + '">' + value.name + '</a>');
            });
        }
    });

    $("#formDepartment").on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            type: "POST",
            url: 'http://127.0.0.1:8000/api/group/add',
            data: formData,
            success: function(data) {
                console.log(data);
                location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus + " - " + errorThrown);
            }
        });
    });

    $("#formLogin").on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            type: "POST",
            url: 'http://127.0.0.1:8000/api/login',
            data: formData,
            success: function(data) {
                console.log(data);
                Cookies.set('token', data.token, {expires: 1});
                Cookies.set('udata', formData, {expires: 1});
                location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus + " - " + errorThrown);
                alert('Invalid Login');
            }
        });
    });

    $("#formQuestion").on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            type: "POST",
            url: 'http://127.0.0.1:8000/api/question/add',
            data: formData,
            success: function(data) {
                console.log(data);
                alert('Question inserted');
                location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus + " - " + errorThrown);
                alert('Error Occured');
            }
        });
    });
    $('#accordionSidebar').on("click", ".group-departments", function(event) {
        const ep = $(this).attr('data-endpoint');
        const c = $(this).attr('data-group');
        const id = $(this).attr('data-id');
        Cookies.set('app', '4', {expires: 1});
        Cookies.set('group', c, {expires: 1});

        



        if (event.ctrlKey) {
            // $.ajax({
            //     type: "POST",
            //     url: ep,
            //     success: function(data) {
            //         console.log(data);
            //         location.reload();
            //     },
            //     error: function(jqXHR, textStatus, errorThrown) {
            //         console.log(textStatus + " - " + errorThrown);
            //     }
            // });

            // let text;
            // let person = prompt("Please enter your name:", c);
            // if (person == null || person == "") {
            //     text = "User cancelled the prompt.";
            // } else {
            //     text = "Hello " + person + "! How are you today?";
            // }
            // document.getElementById("demo").innerHTML = text;
            $('#mdlGroup').modal('show');
            $('#idg').val(id);
            $('#aDepartment').val(c);
        }
        else {
            $('#app').load('../group.php');
            $.ajax({
                type: "GET",
                url: 'http://127.0.0.1:8000/api/group/' + c,
                success: function(data) {
                    var html = "";
                    $.each(data, function(index, item) {
                        $('#questions').append("<tr><td>" + item.id + "</td><td>" + item.group_id + "</td><td>" + item.course + "</td><td>" + item.question + "</td><td><a style='color: inherit' target='_blank' href='http://127.0.0.1:8000/api/question/delete/" + item.id + "'><i class='fa fa-trash pointer'></i></a><i class='fa fa-edit pointer edits' data-toggle='modal' data-target='#mdlEditQuestion'></i></td></tr>");
                        $('.edits-' + item.id).on("click", function(event) {
                            $.ajax({
                                type: "GET",
                                url: 'http://127.0.0.1:8000/api/question/' + item.id,
                                success: function(data) {
                                    $('#editQuestion').val(data.question);
                                    $('#editCourse').val(data.course);
                                    $('#id').val(data.id);
                                },
                                error: function(jqXHR, textStatus, errorThrown) {
                                    console.log(textStatus + " - " + errorThrown);
                                }
                            });
                        });
                    });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + " - " + errorThrown);
                }
            });
        }
    });

    $('.logout').on("click", function() {
        var udata = Cookies.get('udata');
        var d = udata.split("&");
        var email = d[0].replace('email=','');
        var password = d[1].replace('password=','');
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8000/api/logout',
            data: {
                email: email,
                password: password,
            },
            success: function(data) {
                console.log(data);
                Cookies.set('token', '', {expires: -1});
                location.reload();
            }
        });
    });
    
    $('.a-welcome').on("click", function(event) {
        Cookies.set('app', '2', {expires: 1});
        $('#app').load('../welcome.php');
        $.ajax({
            type: "GET",
            url: 'http://127.0.0.1:8000/api/talk/welcome',
            success: function(data) {
                var html = "";
                $.each(data, function(index, item) {
                  html += 
                  "<tr>" + 
                    "<td>" + item.id + "</td>" + 
                    "<td>" + item.message + "</td>" + 
                    "<td>" + item.type + "</td>" + 
                    "<td>" + 
                    "<a style='color: inherit' target='_blank' href='http://127.0.0.1:8000/api/talk/welcome/delete/" + item.id + "'>" +
                        "<i class='fa fa-trash pointer'></i>" + 
                    "</a>" + 
                    // "<i class='fa fa-edit pointer'></i>" + 
                    "</td>" + 
                  "</tr>";
                });
                $('#items').html(html);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus + " - " + errorThrown);
            }
        });
    });

    $('.a-greeting').on("click", function(event) {
        Cookies.set('app', '3', {expires: 1});
        $('#app').load('../greeting.php');
        $.ajax({
            type: "GET",
            url: 'http://127.0.0.1:8000/api/talk/greeting',
            success: function(data) {
                var html = "";
                $.each(data, function(index, item) {
                  html += 
                  "<tr>" + 
                    "<td>" + item.id + "</td>" + 
                    "<td>" + item.message + "</td>" + 
                    "<td>" + item.type + "</td>" + 
                    "<td>" + 
                    "<a style='color: inherit' target='_blank' href='http://127.0.0.1:8000/api/talk/greeting/delete/" + item.id + "'>" +
                        "<i class='fa fa-trash pointer'></i>" + 
                    "</a>" + 
                    // "<i class='fa fa-edit pointer'></i>" + 
                    "</td>" + 
                  "</tr>";
                });
                $('#items').html(html);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus + " - " + errorThrown);
            }
        });
    });

    $("#formWelcome").on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            type: "POST",
            url: 'http://127.0.0.1:8000/api/talk/welcome/add',
            data: formData,
            success: function(data) {
                console.log(data);
                location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus + " - " + errorThrown);
            }
        });
    });

    $("#formGreeting").on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            type: "POST",
            url: 'http://127.0.0.1:8000/api/talk/greeting/add',
            data: formData,
            success: function(data) {
                console.log(data);
                location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus + " - " + errorThrown);
            }
        });
    });

    $("#formEditQuestion").on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            type: "POST",
            url: 'http://127.0.0.1:8000/api/question/update',
            data: formData,
            success: function(data) {
                console.log(data);
                location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus + " - " + errorThrown);
            }
        });
    });
    
    $("#formADepartment").on('submit', function(e) {
        var action = $('#action').val();
        e.preventDefault();
        if (action == 2) {
            var formData = $(this).serialize();
            $.ajax({
                type: "POST",
                url: 'http://127.0.0.1:8000/api/group/update',
                data: formData,
                success: function(data) {
                    alert('Data Updated');
                    console.log(data);
                    location.reload();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + " - " + errorThrown);
                    alert('Error Occured');
                }
            });
        }
        else if (action == 1) {
            var aDepartment = $('#aDepartment').val();
            $.ajax({
                type: "GET",
                url: 'http://127.0.0.1:8000/api/group/delete/' +  aDepartment,
                success: function(data) {
                    alert('Data deleted');
                    console.log(data);
                    location.reload();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + " - " + errorThrown);
                    alert('Error Occured' + 'http://127.0.0.1:8000/api/group/delete/' +  aDepartment);
                }
            });
        }
        else {
            alert('Invalid Action');
        }
    });
    
});