
document.addEventListener('DOMContentLoaded', function () {
    // Function to handle sidebar state based on screen width
    function handleSidebarState() {
        var sidebar = document.getElementById('sidebar');
        var sidebarCollapse = document.getElementById('sidebarCollapse');

        if (window.innerWidth < 800) {
            sidebar.classList.add('minimized');
            sidebarCollapse.style.display = 'none';
        } else if (window.innerWidth < 1200) {
            sidebar.classList.add('minimized');
            sidebarCollapse.style.display = 'block';
        } else {
            sidebar.classList.remove('minimized');
            sidebarCollapse.style.display = 'block';
        }
    }

    // Run the function on page load
    handleSidebarState();

    // Run the function on window resize
    window.addEventListener('resize', function () {
        handleSidebarState();
    });

    var sidebarCollapse = document.getElementById('sidebarCollapse');
    sidebarCollapse.addEventListener('click', function () {
        var sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
        // Toggle the minimized class to handle the expanded state
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('minimized');
        } else {
            sidebar.classList.add('minimized');
        }
    });
});

document.querySelectorAll('.components li').forEach(function(item) {
    item.addEventListener('click', function() {
        // Remove 'selected' class from all <li> elements
        document.querySelectorAll('.components li').forEach(function(li) {
            li.classList.remove('selected');
        });
        // Add 'selected' class to the clicked <li>
        this.classList.add('selected');
    });
});
