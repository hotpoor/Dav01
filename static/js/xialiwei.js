// Generated by CoffeeScript 1.12.7
(function() {
  var Hs, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.Hs || (root.Hs = {});

  Hs = root.Hs;

  $(function() {
    var load_folder, load_folder_list, load_ready_run;
    console.log("Hello, I am xialiwei.");
    $("body").on("click", ".add_folder", function(evt) {
      var folder_name;
      folder_name = $(".add_folder_name").val();
      return add_folder(folder_name);
    });
    $("body").on("click", ".add_folder_new", function(evt) {
      return add_folder();
    });
    $("body").on("input propertychange", ".add_folder_name", function(evt) {
      var folder_name;
      folder_name = $(".add_folder_name").val();
      return search_folder_local(folder_name);
    });
    root.search_folder_local = function(folder_name) {
      var i, item, items, len, results;
      if (folder_name == null) {
        folder_name = "";
      }
      if (folder_name === "") {
        $(".card_folder_list_item").removeClass("hide");
      }
      items = $(".card_folder_list_item");
      results = [];
      for (i = 0, len = items.length; i < len; i++) {
        item = items[i];
        if ($(item).text().indexOf(folder_name) === -1) {
          results.push($(item).addClass("hide"));
        } else {
          results.push($(item).removeClass("hide"));
        }
      }
      return results;
    };
    root.add_folder = function(folder_name) {
      var url;
      if (folder_name == null) {
        folder_name = "";
      }
      if (folder_name === "") {
        folder_name = "新建文件夹";
      }
      url = "/*add_folder";
      return $.ajax({
        url: url,
        data: {
          folder_name: folder_name
        },
        dataType: 'json',
        type: 'POST',
        success: function(data) {
          console.log(data);
          return load_folder_list();
        },
        error: function(data) {
          return console.log(data);
        }
      });
    };
    $("body").on("click", ".card_folder_list_item", function(evt) {
      var k, v;
      k = $(this).attr("data-k");
      v = $(this).attr("data-v");
      $(".current_folder_name").text(k);
      return load_folder(k, v);
    });
    load_folder = function(folder_name, folder_meta_hash) {
      var url;
      if (folder_name == null) {
        folder_name = null;
      }
      if (folder_meta_hash == null) {
        folder_meta_hash = null;
      }
      $(".card_content_list").empty();
      if (folder_name === null || folder_meta_hash === null) {
        return;
      }
      url = "/*get_meta";
      return $.ajax({
        url: url,
        data: {
          folder_meta_hash: folder_meta_hash
        },
        dataType: 'json',
        type: 'GET',
        success: function(data) {
          var file_type, k, k_list, pre_html, ref, ref1, results, v;
          console.log(data);
          if (data === "no storage config") {
            return;
          }
          if (data.items != null) {
            ref = data.items;
            results = [];
            for (k in ref) {
              v = ref[k];
              k_list = k.split(".");
              pre_html = "";
              file_type = k_list[k_list.length - 1];
              if ((ref1 = file_type.toLocaleLowerCase()) === "jpg" || ref1 === "jpeg" || ref1 === "gif" || ref1 === "png" || ref1 === "webp" || ref1 === "bmp") {
                pre_html = "<img class=\"card_content_list_item_img\" src=\"/" + folder_name + "/" + k + "\">";
              }
              results.push($(".card_content_list").append("<div class=\"card_content_list_item\">\n    " + pre_html + "\n    <div class=\"card_content_list_item_tools\">\n        <a href=\"/" + folder_name + "/" + k + "\">下载</a>\n    </div>\n    \n</div>"));
            }
            return results;
          }
        },
        error: function(data) {
          return console.log(data);
        }
      });
    };
    load_folder_list = function() {
      var url;
      $(".card_folder_list").empty();
      url = "/*get_folders";
      return $.ajax({
        url: url,
        data: null,
        dataType: 'json',
        type: 'GET',
        success: function(data) {
          var k, ref, results, v;
          console.log(data);
          ref = data.folders;
          results = [];
          for (k in ref) {
            v = ref[k];
            results.push($(".card_folder_list").append("<div class=\"card_folder_list_item\" data-k=\"" + k + "\" data-v=\"" + v + "\">" + k + "</div>"));
          }
          return results;
        },
        error: function(data) {
          return console.log(data);
        }
      });
    };
    load_ready_run = function() {
      return load_folder_list();
    };
    return $(window).on("load", function(evt) {
      return load_ready_run();
    });
  });

}).call(this);
