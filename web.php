

use App\Http\Controllers\SearchController;

Route::get('/api/search', [SearchController::class, 'search']);
