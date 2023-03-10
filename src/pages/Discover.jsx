// imports
//components are divs that say component name
import {Error, Loader, SongCard} from '../components';
import{genres} from '../assets/constants';

// import redux functions (hooks)
import { useDispatch, useSelector } from 'react-redux';


// importing queries
import { useGetTopChartsQuery } from '../redux/services/shazamCore';



import { selectGenreListId } from '../redux/features/playerSlice';


// importing query to filter songs by genre through select drop down
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';


const Discover = () => {

    // hook
    const dispatch = useDispatch();


    const {activeSong, isPlaying, genreListId} = useSelector((state) =>  state.player);


    // calling api as hook. returns api data, fetching state for load state, and error.
    const {data, isFetching, error} = useGetSongsByGenreQuery(genreListId || 'POP');

    //console logg
    console.log(genres);
    console.log(data);

    // //hardcoding genre title
    // const genreTitle = 'Pop';

    const genreTitle = genres.find(({ value })  =>  value === genreListId)?.title;

    
    if (isFetching) 
        return <Loader title='Loading'/>;

    if (error) 
        return <Error />;


    return(
        <div className='flex flex-col'>

            <div className='w-full flex justify-between items-center sm:flex-row
            flex-col mt-4 mb-10'>

                <h2 className='font-bold text-3xl text-red-100 text-left'>Discover {genreTitle}</h2>
                {/* genre select */}
                <select
                    onChange={(event)    => dispatch(selectGenreListId(event.target.value))}
                    value = {genreListId || 'pop'}
                    className='bg-black text-gray-200 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'
                >
                    {genres.map((genre) =>  <option key={genre.value} value={genre.value}>{genre.title}</option>)}
                </select>

            </div>
            {/* wrapper div for songs of diff genres */}
            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {/* mapping songs that are fetched from shazam core api. ?- if data doesn't exist yet. */}
                {data?.map((song, i)  =>  (
                    // self closing song card component
                    <SongCard 
                        key = {song.key}
                        song = {song}
                        // i is index
                        i = {i}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                    />
                ))}
            </div>

        </div>
    );
};

export default Discover;
