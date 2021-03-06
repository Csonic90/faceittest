import Image from 'next/image'
import styles from '../styles/Test.module.css'

export const Test = ({playersList}) => {

console.log(playersList)

 

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>COLD HAND PLAYER</h1>
      <h2 className={styles.header}>lvl1: 800 | lvl2: 801-951 | lvl3: 952-1101 | lvl4: 1102-1251 | lvl5: 1252-1401 | lvl6: 1402-1551 |  lvl7: 1552-1701 | lvl8: 1702-1851 | lvl9: 1852-2001 | lvl10: 2002+ </h2>
      <div className={styles.playerList} >
     {playersList.map((player, key)=> 

      <div key={key} className={styles.player}>
        <div>{player.nickname}</div>
        <div><Image src={player.avatar} width={100} height={100}/></div>
      <div>ELO: {player.games.csgo.faceit_elo}</div> 
      <div>LEVEL: {player.games.csgo.skill_level}</div>  
      </div>
     )}
     </div>
    </div>
  )
}

export const getStaticProps = async () => {

  const players = ["0a7cdac8-b807-4db0-b371-246061b8d23d",
  "a9de04f0-91cb-49ae-8872-97156a48406e",
  "1911409b-0292-4f50-b66b-1dee3f9b7bd0",
  "96786b1a-c278-4efb-8123-c0a7fdd6fa63",
  "eb1de30f-3c7e-48c7-9649-a3fea9e46558",
  "1f60cb61-72fa-4fcf-b553-bb48e0c60343",
  "9bd84ca3-5e44-444e-ae6d-3dc1b59f99dc",
  "d3b5987d-47ff-4ee2-abfa-2b715d048641",
  "3cb52aca-91ab-4f09-9d9d-9d2f97701c2c",
  "f3637a92-5671-4564-b951-02f402a96650",
  "c0e46cee-52e9-49bd-89b4-64d21cfa358c" ]

    const playersList = await Promise.all(
      players.map(getPlayer)
    ); 
   async function getPlayer(item, index){
      
      const res = await fetch(`https://open.faceit.com/data/v4/players/${item}`, {
                                method: "GET",
                                headers: {
                                  "Content-type": "application/json;charset=UTF-8",
                                  "Authorization" : "Bearer 7ba74f51-8955-4749-9d5b-18c5e1fd8e72"
                                        }
                              });

          const data = await res.json();
          return (index,data);
                            }             
    return {
        props: {playersList}
          }

}

export default  Test;