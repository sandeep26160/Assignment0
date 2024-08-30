
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClothingItem;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');

        if (strlen($query) > 3) {
            $items = ClothingItem::where('name', 'LIKE', "%{$query}%")
                                  ->orWhere('description', 'LIKE', "%{$query}%")
                                  ->get();
            return response()->json($items);
        }

        return response()->json([]);
    }
}
