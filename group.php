<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800"><?php echo $_COOKIE["group"]; ?></h1>
</div>
<div class="row">
    <button type="button" class="btn btn-primary mb-3" data-toggle="modal" data-target="#mdlQuestion">Add Question</button>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Department</th>
                <th scope="col">Course</th>
                <th scope="col">Question</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody id="questions"></tbody>
    </table>
</div>