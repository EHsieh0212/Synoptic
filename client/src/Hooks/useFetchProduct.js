// 1. currently not using useCallback: this is for react render performance improvement, not for correctness.
// 2. useLocation for local query string retrieval (compare to window.location.search+URLSearchParams)
// 3. main road map: paging as trigger(bc we need to set pages if navigate to certain category) -> url keyword -> get product arrays (paging default=0)

import { useState, useEffect } from 'react';

